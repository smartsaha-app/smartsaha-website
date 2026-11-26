'use client';

import { useState, useEffect, useMemo, FormEvent } from 'react';
import {
  Plus,
  Search,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Users,
  MessageSquareWarning,
  ExternalLink,
  Calendar,
  Send,
} from 'lucide-react';

import { api } from '@/lib/api';
import {
  Complaint,
  ComplaintStatus,
  Developer,
  Task,
  TaskStatus,
  TASK_STATUS_LABELS,
  COMPLAINT_STATUS_LABELS,
  getComplaintStatus,
  countComplaintsByStatus,
} from '@/lib/complaints';

/* =========================================================
   STYLES DES STATUTS
========================================================= */

const COMPLAINT_BADGE: Record<ComplaintStatus, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
  resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const TASK_SELECT: Record<TaskStatus, string> = {
  not_started: 'bg-gray-50 text-gray-700 border-gray-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
  done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

type Filter = 'all' | ComplaintStatus;

interface ConfirmState {
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
}

interface Toast {
  type: 'success' | 'error';
  message: string;
}

const errorMessage = (err: any, fallback: string) =>
  err?.response?.data?.message || fallback;

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Date inconnue';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/* =========================================================
   PAGE
========================================================= */

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const [complaintsRes, developersRes] = await Promise.all([
        api.get('/complaints'),
        api.get('/developers'),
      ]);
      setComplaints(complaintsRes.data.complaints || []);
      setDevelopers(developersRes.data.developers || []);
    } catch (err) {
      setError(errorMessage(err, 'Erreur de chargement des plaintes'));
    } finally {
      setLoading(false);
    }
  };

  // Recharge uniquement les plaintes (après une modif de tâche)
  const refreshComplaints = async () => {
    const res = await api.get('/complaints');
    setComplaints(res.data.complaints || []);
  };

  const notify = (type: Toast['type'], message: string) => setToast({ type, message });

  /* ---------- Statistiques et filtres ---------- */

  const counts = useMemo(() => countComplaintsByStatus(complaints), [complaints]);

  const filteredComplaints = useMemo(() => {
    const q = search.trim().toLowerCase();
    return complaints.filter((c) => {
      if (filter !== 'all' && getComplaintStatus(c) !== filter) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q) ||
        (c.page || '').toLowerCase().includes(q)
      );
    });
  }, [complaints, filter, search]);

  const filterTabs: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: 'Toutes', count: counts.total },
    { key: 'new', label: 'Nouvelles', count: counts.new },
    { key: 'in_progress', label: 'En cours', count: counts.in_progress },
    { key: 'resolved', label: 'Résolues', count: counts.resolved },
  ];

  /* ---------- Actions plaintes ---------- */

  const askDeleteComplaint = (complaint: Complaint) => {
    setConfirm({
      title: 'Supprimer la plainte ?',
      message: `« ${complaint.title} » et toutes ses tâches seront supprimées définitivement.`,
      onConfirm: async () => {
        await api.delete(`/complaints/${complaint.id}`);
        setComplaints((prev) => prev.filter((c) => c.id !== complaint.id));
        notify('success', 'Plainte supprimée');
      },
    });
  };

  /* ---------- Actions tâches ---------- */

  const addTask = async (complaintId: number, title: string, developerId: number | null) => {
    try {
      await api.post('/tasks', {
        complaint_id: complaintId,
        title,
        developer_id: developerId,
      });
      await refreshComplaints();
      notify('success', 'Tâche ajoutée');
      return true;
    } catch (err) {
      notify('error', errorMessage(err, "Impossible d'ajouter la tâche"));
      return false;
    }
  };

  const updateTask = async (taskId: number, changes: Partial<Pick<Task, 'status' | 'developer_id'>>) => {
    try {
      await api.put(`/tasks/${taskId}`, changes);
      await refreshComplaints();
    } catch (err) {
      notify('error', errorMessage(err, 'Impossible de modifier la tâche'));
    }
  };

  const askDeleteTask = (task: Task) => {
    setConfirm({
      title: 'Supprimer la tâche ?',
      message: `« ${task.title} » sera supprimée définitivement.`,
      onConfirm: async () => {
        await api.delete(`/tasks/${task.id}`);
        await refreshComplaints();
        notify('success', 'Tâche supprimée');
      },
    });
  };

  const notifyDevelopers = async (complaintId: number) => {
    try {
      const res = await api.post(`/complaints/${complaintId}/notify`);
      const failed: string[] = res.data.failed || [];
      notify(failed.length ? 'error' : 'success', res.data.message || 'Email envoyé');
    } catch (err) {
      notify('error', errorMessage(err, "Impossible d'envoyer l'email"));
    }
  };

  const runConfirm = async () => {
    if (!confirm) return;
    try {
      setConfirmLoading(true);
      await confirm.onConfirm();
      setConfirm(null);
    } catch (err) {
      notify('error', errorMessage(err, 'Une erreur est survenue'));
      setConfirm(null);
    } finally {
      setConfirmLoading(false);
    }
  };

  /* ---------- Rendu ---------- */

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* En-tête */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Boîte à plaintes
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Suivez les plaintes reçues et les tâches pour les résoudre.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDevModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              <Users className="h-4 w-4" />
              Développeurs
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {developers.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsComplaintModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#10b481] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0e9b6e]"
            >
              <Plus className="h-4 w-4" />
              Nouvelle plainte
            </button>
          </div>
        </div>

        {/* Erreur globale */}
        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <div className="flex-1 text-sm">{error}</div>
            <button onClick={fetchAll} className="text-xs font-semibold underline hover:no-underline">
              Réessayer
            </button>
          </div>
        )}

        {/* Filtres + recherche */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
                  filter === tab.key
                    ? 'border-[#10b481] bg-[#10b481]/10 text-[#0e9b6e]'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className="rounded-full bg-white/80 px-2 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une plainte..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20"
            />
          </div>
        </div>

        {/* Liste */}
        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16">
            <Loader2 className="mb-2 h-8 w-8 animate-spin text-[#10b481]" />
            <p className="text-sm text-gray-500">Chargement des plaintes...</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 text-center">
            <MessageSquareWarning className="mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm font-medium text-gray-700">Aucune plainte</p>
            <p className="mt-1 text-xs text-gray-500">
              {complaints.length === 0
                ? 'Les plaintes envoyées depuis le site apparaîtront ici.'
                : 'Aucune plainte ne correspond à ce filtre.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                developers={developers}
                expanded={expandedId === complaint.id}
                onToggle={() => setExpandedId(expandedId === complaint.id ? null : complaint.id)}
                onDelete={() => askDeleteComplaint(complaint)}
                onAddTask={addTask}
                onUpdateTask={updateTask}
                onDeleteTask={askDeleteTask}
                onNotify={notifyDevelopers}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modale nouvelle plainte */}
      {isComplaintModalOpen && (
        <ComplaintFormModal
          onClose={() => setIsComplaintModalOpen(false)}
          onCreated={(c) => {
            setComplaints((prev) => [{ ...c, tasks: [] }, ...prev]);
            setIsComplaintModalOpen(false);
            notify('success', 'Plainte ajoutée');
          }}
          onError={(msg) => notify('error', msg)}
        />
      )}

      {/* Modale développeurs */}
      {isDevModalOpen && (
        <DevelopersModal
          developers={developers}
          onClose={() => setIsDevModalOpen(false)}
          onChange={async () => {
            const res = await api.get('/developers');
            setDevelopers(res.data.developers || []);
            await refreshComplaints();
          }}
          notify={notify}
          askConfirm={setConfirm}
        />
      )}

      {/* Modale de confirmation */}
      {confirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-7 w-7 text-red-600" />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-gray-900">{confirm.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{confirm.message}</p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                disabled={confirmLoading}
                onClick={() => setConfirm(null)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={confirmLoading}
                onClick={runConfirm}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {confirmLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[110] flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {toast.message}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   CARTE PLAINTE
========================================================= */

interface ComplaintCardProps {
  complaint: Complaint;
  developers: Developer[];
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onAddTask: (complaintId: number, title: string, developerId: number | null) => Promise<boolean>;
  onUpdateTask: (taskId: number, changes: Partial<Pick<Task, 'status' | 'developer_id'>>) => Promise<void>;
  onDeleteTask: (task: Task) => void;
  onNotify: (complaintId: number) => Promise<void>;
}

function ComplaintCard({
  complaint,
  developers,
  expanded,
  onToggle,
  onDelete,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onNotify,
}: ComplaintCardProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDev, setTaskDev] = useState('');
  const [adding, setAdding] = useState(false);
  const [notifying, setNotifying] = useState(false);

  const tasks = complaint.tasks ?? [];
  const assignedDevCount = new Set(
    tasks.filter((t) => t.developer_id !== null).map((t) => t.developer_id)
  ).size;

  const handleNotify = async () => {
    setNotifying(true);
    await onNotify(complaint.id);
    setNotifying(false);
  };
  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const status = getComplaintStatus(complaint);
  const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    setAdding(true);
    const ok = await onAddTask(complaint.id, taskTitle.trim(), taskDev ? Number(taskDev) : null);
    setAdding(false);
    if (ok) {
      setTaskTitle('');
      setTaskDev('');
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      {/* Résumé */}
      <div className="flex items-start gap-4 p-5">
        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-start gap-4 text-left"
          aria-expanded={expanded}
        >
          <ChevronDown
            className={`mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${COMPLAINT_BADGE[status]}`}>
                {COMPLAINT_STATUS_LABELS[status]}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(complaint.created_at)}
              </span>
              {complaint.page && (
                <span className="inline-flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" />
                  {complaint.page}
                </span>
              )}
              <span>
                {tasks.length === 0
                  ? 'Aucune tâche'
                  : `${doneCount}/${tasks.length} tâche${tasks.length > 1 ? 's' : ''} terminée${doneCount > 1 ? 's' : ''}`}
              </span>
            </div>
            {tasks.length > 0 && (
              <div className="mt-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#10b481] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Supprimer la plainte"
          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Détail */}
      {expanded && (
        <div className="space-y-5 border-t border-gray-100 bg-gray-50/50 px-5 py-5">
          {complaint.description && (
            <div>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Description</h4>
              <p className="whitespace-pre-line text-sm text-gray-700">{complaint.description}</p>
            </div>
          )}

          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tâches</h4>
              <button
                type="button"
                onClick={handleNotify}
                disabled={notifying || assignedDevCount === 0}
                title={
                  assignedDevCount === 0
                    ? 'Assignez au moins une tâche à un développeur'
                    : 'Envoyer à chaque développeur la plainte et ses tâches'
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#10b481]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[#0e9b6e] transition hover:bg-[#10b481]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {notifying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                Notifier {assignedDevCount > 1 ? `les ${assignedDevCount} développeurs` : 'le développeur'}
              </button>
            </div>

            {tasks.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune tâche pour cette plainte.</p>
            ) : (
              <ul className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100 bg-white">
                {tasks.map((task) => (
                  <li key={task.id} className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
                    <span
                      className={`flex-1 text-sm ${task.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-800'}`}
                    >
                      {task.title}
                    </span>

                    <select
                      value={task.developer_id ?? ''}
                      onChange={(e) =>
                        onUpdateTask(task.id, { developer_id: e.target.value ? Number(e.target.value) : null })
                      }
                      aria-label="Développeur assigné"
                      className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-[#10b481]"
                    >
                      <option value="">Non assignée</option>
                      {developers.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>

                    <select
                      value={task.status}
                      onChange={(e) => onUpdateTask(task.id, { status: e.target.value as TaskStatus })}
                      aria-label="Statut de la tâche"
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none ${TASK_SELECT[task.status]}`}
                    >
                      {(Object.keys(TASK_STATUS_LABELS) as TaskStatus[]).map((s) => (
                        <option key={s} value={s}>{TASK_STATUS_LABELS[s]}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => onDeleteTask(task)}
                      aria-label="Supprimer la tâche"
                      className="self-end rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600 sm:self-auto"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Ajout de tâche */}
            <form onSubmit={handleAddTask} className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                maxLength={200}
                placeholder="Nouvelle tâche..."
                className="flex-1 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm outline-none focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20"
              />
              <select
                value={taskDev}
                onChange={(e) => setTaskDev(e.target.value)}
                aria-label="Assigner à"
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#10b481]"
              >
                <option value="">Non assignée</option>
                {developers.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={adding || !taskTitle.trim()}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#10b481] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0e9b6e] disabled:opacity-50"
              >
                {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   MODALE NOUVELLE PLAINTE
========================================================= */

interface ComplaintFormModalProps {
  onClose: () => void;
  onCreated: (complaint: Complaint) => void;
  onError: (message: string) => void;
}

function ComplaintFormModal({ onClose, onCreated, onError }: ComplaintFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [page, setPage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setSaving(true);
      const res = await api.post('/complaints', {
        title: title.trim(),
        description: description.trim() || null,
        page: page.trim() || null,
      });
      onCreated(res.data.complaint);
    } catch (err) {
      onError(errorMessage(err, "Impossible d'ajouter la plainte"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Nouvelle plainte</h3>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Titre *</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
              className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Page concernée</span>
            <input
              type="text"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              maxLength={255}
              placeholder="/contact"
              className="mt-1 w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving || !title.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#10b481] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0e9b6e] disabled:opacity-50"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   MODALE DÉVELOPPEURS
========================================================= */

interface DevelopersModalProps {
  developers: Developer[];
  onClose: () => void;
  onChange: () => Promise<void>;
  notify: (type: Toast['type'], message: string) => void;
  askConfirm: (state: ConfirmState) => void;
}

function DevelopersModal({ developers, onClose, onChange, notify, askConfirm }: DevelopersModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    try {
      setSaving(true);
      await api.post('/developers', { name: name.trim(), email: email.trim() });
      await onChange();
      setName('');
      setEmail('');
      notify('success', 'Développeur ajouté');
    } catch (err) {
      notify('error', errorMessage(err, "Impossible d'ajouter le développeur"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (dev: Developer) => {
    askConfirm({
      title: 'Supprimer le développeur ?',
      message: `${dev.name} sera supprimé. Ses tâches deviendront non assignées.`,
      onConfirm: async () => {
        await api.delete(`/developers/${dev.id}`);
        await onChange();
        notify('success', 'Développeur supprimé');
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Développeurs</h3>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 max-h-72 overflow-y-auto">
          {developers.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">Aucun développeur pour le moment.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {developers.map((dev) => (
                <li key={dev.id} className="flex items-center gap-3 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10b481] text-sm font-bold text-white">
                    {dev.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">{dev.name}</p>
                    <p className="truncate text-xs text-gray-500">{dev.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(dev)}
                    aria-label={`Supprimer ${dev.name}`}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={handleAdd} className="mt-4 space-y-2 border-t border-gray-100 pt-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom"
              maxLength={100}
              className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              maxLength={150}
              className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2 text-sm outline-none focus:border-[#10b481] focus:ring-2 focus:ring-[#10b481]/20"
            />
          </div>
          <button
            type="submit"
            disabled={saving || !name.trim() || !email.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#10b481] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0e9b6e] disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Ajouter un développeur
          </button>
        </form>
      </div>
    </div>
  );
}
