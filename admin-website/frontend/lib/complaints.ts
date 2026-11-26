// lib/complaints.ts
// Types et règles partagés pour la boîte à plaintes (page /complaints + dashboard)

export type TaskStatus = 'not_started' | 'in_progress' | 'done';

export interface Developer {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export interface Task {
  id: number;
  complaint_id: number;
  developer_id: number | null;
  title: string;
  status: TaskStatus;
  created_at?: string;
  updated_at?: string;
  developer?: Pick<Developer, 'id' | 'name' | 'email'> | null;
}

export interface Complaint {
  id: number;
  title: string;
  description?: string | null;
  page?: string | null;
  created_at?: string;
  tasks?: Task[];
}

export type ComplaintStatus = 'new' | 'in_progress' | 'resolved';

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  not_started: 'Non commencée',
  in_progress: 'En cours',
  done: 'Terminée',
};

export const COMPLAINT_STATUS_LABELS: Record<ComplaintStatus, string> = {
  new: 'Nouvelle',
  in_progress: 'En cours',
  resolved: 'Résolue',
};

/**
 * Statut d'une plainte, déduit de ses tâches :
 * - Nouvelle  : aucune tâche, ou aucune tâche commencée
 * - Résolue   : au moins une tâche et TOUTES les tâches sont terminées
 * - En cours  : tous les autres cas (au moins une tâche commencée ou terminée)
 */
export function getComplaintStatus(complaint: Complaint): ComplaintStatus {
  const tasks = complaint.tasks ?? [];

  if (tasks.length === 0 || tasks.every((t) => t.status === 'not_started')) {
    return 'new';
  }
  if (tasks.every((t) => t.status === 'done')) {
    return 'resolved';
  }
  return 'in_progress';
}

export function countComplaintsByStatus(complaints: Complaint[]) {
  const counts = { total: complaints.length, new: 0, in_progress: 0, resolved: 0 };
  for (const c of complaints) {
    counts[getComplaintStatus(c)] += 1;
  }
  return counts;
}
