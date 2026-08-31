'use client';

import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';

import Image from 'next/image';

import {
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
  FileText,
  LayoutGrid,
  List,
  X,
  Loader2,
  Upload,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';

import { api } from '@/lib/api';

interface Category {
  id: number;
  name: string;
}

export interface Blog {
  id: number;
  title: string;
  excerpt?: string;
  content: string;
  image?: string;
  createdAt?: string;
  created_at?: string;
  date?: string;
  category?: Category | number | null;
  category_id?: number;
}

/* =========================================================
   TYPES MODAL
========================================================= */

type ModalType = 'success' | 'error' | 'warning' | 'confirm';

interface ModalState {
  open: boolean;
  type: ModalType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

/* =========================================================
   COMPOSANT MODAL
========================================================= */

interface ActionModalProps {
  modal: ModalState;
  onClose: () => void;
}

function ActionModal({
  modal,
  onClose,
}: ActionModalProps) {
  if (!modal.open) return null;

  const isConfirm = modal.type === 'confirm';

  const icon =
    modal.type === 'success' ? (
      <CheckCircle2 className="h-7 w-7 text-emerald-600" />
    ) : modal.type === 'error' ? (
      <AlertCircle className="h-7 w-7 text-red-600" />
    ) : (
      <AlertTriangle className="h-7 w-7 text-amber-600" />
    );

  const iconBackground =
    modal.type === 'success'
      ? 'bg-emerald-100'
      : modal.type === 'error'
      ? 'bg-red-100'
      : 'bg-amber-100';

  const confirmButton =
    modal.type === 'confirm'
      ? 'bg-red-600 hover:bg-red-700'
      : modal.type === 'error'
      ? 'bg-red-600 hover:bg-red-700'
      : 'bg-emerald-600 hover:bg-emerald-700';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icone */}
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${iconBackground}`}
        >
          {icon}
        </div>

        {/* Contenu */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-gray-900">
            {modal.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            {modal.message}
          </p>
        </div>

        {/* Boutons */}
        <div className="mt-6 flex justify-center gap-3">
          {isConfirm && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              {modal.cancelText || 'Annuler'}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (modal.onConfirm) {
                modal.onConfirm();
              } else {
                onClose();
              }
            }}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition ${confirmButton}`}
          >
            {modal.confirmText ||
              (isConfirm ? 'Confirmer' : 'OK')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE BLOG
========================================================= */

export default function BlogManagementPage() {
  /* =======================================================
     STATES
  ======================================================= */

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('0');

  const [viewMode, setViewMode] =
    useState<'table' | 'grid'>('table');

  /* Modal création / édition */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingBlog, setEditingBlog] =
    useState<Blog | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Modal aperçu */
  const [selectedBlogForPreview, setSelectedBlogForPreview] =
    useState<Blog | null>(null);

  /* Blog à supprimer */
  const [blogToDelete, setBlogToDelete] =
    useState<Blog | null>(null);

  /* Formulaire */
  const [formData, setFormData] = useState({
    title: '',
    categoryId: 0,
    content: '',
  });

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string>('');

  /* Modal global */
  const [actionModal, setActionModal] =
    useState<ModalState>({
      open: false,
      type: 'success',
      title: '',
      message: '',
    });

  /* =======================================================
     MODAL HELPERS
  ======================================================= */

  const closeActionModal = () => {
    setActionModal((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const showModal = (
    type: ModalType,
    title: string,
    message: string
  ) => {
    setActionModal({
      open: true,
      type,
      title,
      message,
    });
  };

  const showSuccess = (
    title: string,
    message: string
  ) => {
    showModal('success', title, message);
  };

  const showError = (
    title: string,
    message: string
  ) => {
    showModal('error', title, message);
  };

  const showWarning = (
    title: string,
    message: string
  ) => {
    showModal('warning', title, message);
  };

  /* =======================================================
     EXTRACTION ID CATÉGORIE
  ======================================================= */

  const getCategoryId = (
    blogCat?: Category | number | null,
    blogCatId?: number
  ): number => {
    if (
      typeof blogCat === 'object' &&
      blogCat !== null
    ) {
      return blogCat.id;
    }

    if (
      typeof blogCat === 'number' &&
      blogCat > 0
    ) {
      return blogCat;
    }

    return blogCatId || 0;
  };

  /* =======================================================
     NOM CATÉGORIE
  ======================================================= */

  const getCategoryName = (
    blogCat?: Category | number | null,
    blogCatId?: number
  ): string => {
    const catId = getCategoryId(
      blogCat,
      blogCatId
    );

    const found = categories.find(
      (c) => c.id === catId
    );

    return found ? found.name : 'Non classé';
  };

  /* =======================================================
     CHARGEMENT CATÉGORIES
  ======================================================= */

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');

      const rawData = Array.isArray(res.data)
        ? res.data
        : res.data?.data ||
          res.data?.categories ||
          [];

      const formattedCategories: Category[] =
        rawData.map((cat: Category) => ({
          id: cat.id,
          name: cat.name,
        }));

      setCategories(formattedCategories);

      if (formattedCategories.length > 0) {
        setFormData((prev) => ({
          ...prev,
          categoryId:
            prev.categoryId ||
            formattedCategories[0].id,
        }));
      }
    } catch (err) {
      console.error(
        'Erreur chargement catégories:',
        err
      );

      showError(
        'Erreur',
        'Impossible de charger les catégories.'
      );
    }
  };

  /* =======================================================
     CHARGEMENT BLOGS
  ======================================================= */

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get('/blogs');

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.blogs ||
          res.data?.data ||
          [];

      setBlogs(data);
    } catch (err) {
      console.error(
        'Erreur chargement blogs:',
        err
      );

      setError(
        'Impossible de charger les articles.'
      );

      setBlogs([]);

      showError(
        'Erreur de chargement',
        'Impossible de charger les articles depuis le serveur.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIALISATION
  ======================================================= */

  useEffect(() => {
    Promise.all([
      fetchBlogs(),
      fetchCategories(),
    ]);
  }, []);

  /* =======================================================
     CLEANUP IMAGE
  ======================================================= */

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith('blob:')
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  /* =======================================================
     CHANGEMENT IMAGE
  ======================================================= */

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    /* Vérification type */
    if (!file.type.startsWith('image/')) {
      showError(
        'Fichier invalide',
        'Veuillez sélectionner un fichier image valide.'
      );

      e.target.value = '';
      return;
    }

    /* Vérification taille 5 Mo */
    if (file.size > 5 * 1024 * 1024) {
      showError(
        'Image trop volumineuse',
        "L'image ne doit pas dépasser 5 Mo."
      );

      e.target.value = '';
      return;
    }

    if (
      imagePreview &&
      imagePreview.startsWith('blob:')
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  /* =======================================================
     OUVERTURE CRÉATION
  ======================================================= */

  const handleOpenCreateModal = () => {
    setEditingBlog(null);

    setFormData({
      title: '',
      categoryId:
        categories.length > 0
          ? categories[0].id
          : 0,
      content: '',
    });

    setImageFile(null);
    setImagePreview('');

    setIsModalOpen(true);
  };

  /* =======================================================
     OUVERTURE ÉDITION
  ======================================================= */

  const handleOpenEditModal = (
    blog: Blog
  ) => {
    setEditingBlog(blog);

    setFormData({
      title: blog.title,
      categoryId: getCategoryId(
        blog.category,
        blog.category_id
      ),
      content: blog.content,
    });

    setImageFile(null);
    setImagePreview(blog.image || '');

    setIsModalOpen(true);
  };

  /* =======================================================
     FERMETURE FORMULAIRE
  ======================================================= */

  const handleCloseFormModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    setEditingBlog(null);
    setImageFile(null);
    setImagePreview('');
  };

  /* =======================================================
     SOUMISSION FORMULAIRE
  ======================================================= */

  const handleSubmitForm = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    /* Validation catégorie */
    if (!formData.categoryId) {
      showError(
        'Catégorie requise',
        'Veuillez sélectionner une catégorie valide.'
      );
      return;
    }

    /* Validation titre */
    if (!formData.title.trim()) {
      showError(
        'Titre requis',
        "Veuillez saisir le titre de l'article."
      );
      return;
    }

    /* Validation contenu */
    if (!formData.content.trim()) {
      showError(
        'Contenu requis',
        "Veuillez saisir le contenu de l'article."
      );
      return;
    }

    /* Image obligatoire seulement création */
    if (!editingBlog && !imageFile) {
      showError(
        'Image requise',
        "Veuillez importer une image pour l'article."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const dataToSend = new FormData();

      dataToSend.append(
        'title',
        formData.title.trim()
      );

      dataToSend.append(
        'excerpt',
        formData.title
          .trim()
          .substring(0, 150)
      );

      dataToSend.append(
        'categorie_id',
        String(formData.categoryId)
      );

      dataToSend.append(
        'content',
        formData.content.trim()
      );

      if (imageFile) {
        dataToSend.append(
          'image',
          imageFile
        );
      }

      /* ===============================
         MODIFICATION
      =============================== */

      if (editingBlog) {
        dataToSend.append(
          '_method',
          'PUT'
        );

        const response = await api.post(
          `/blogs/${editingBlog.id}`,
          dataToSend,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          }
        );

        await fetchBlogs();

        setIsModalOpen(false);
        setEditingBlog(null);

        showSuccess(
          'Article modifié',
          response.data?.message ||
            "L'article a été modifié avec succès."
        );
      }

      /* ===============================
         CRÉATION
      =============================== */

      else {
        const response = await api.post(
          '/blogs',
          dataToSend,
          {
            headers: {
              'Content-Type':
                'multipart/form-data',
            },
          }
        );

        await fetchBlogs();

        setIsModalOpen(false);

        showSuccess(
          'Article créé',
          response.data?.message ||
            "L'article a été créé avec succès."
        );
      }

      /* Reset */
      setFormData({
        title: '',
        categoryId:
          categories.length > 0
            ? categories[0].id
            : 0,
        content: '',
      });

      setImageFile(null);
      setImagePreview('');
    } catch (err: any) {
      console.error(
        "Erreur lors de l'enregistrement du blog:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        `Erreur lors de la ${
          editingBlog
            ? 'mise à jour'
            : 'création'
        } de l'article.`;

      showError(
        'Opération impossible',
        message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     OUVRIR CONFIRMATION SUPPRESSION
  ======================================================= */

  const handleAskDeleteBlog = (
    blog: Blog
  ) => {
    setBlogToDelete(blog);

    setActionModal({
      open: true,
      type: 'confirm',
      title: 'Supprimer cet article ?',
      message: `Êtes-vous sûr de vouloir supprimer "${blog.title}" ? Cette action est irréversible.`,
      confirmText: 'Confirmer la suppression',
      cancelText: 'Annuler',
      onConfirm: () => {
        closeActionModal();
        handleDeleteBlog(blog);
      },
    });
  };

  /* =======================================================
     SUPPRESSION BLOG
  ======================================================= */

  const handleDeleteBlog = async (
    blog?: Blog
  ) => {
    const targetBlog =
      blog || blogToDelete;

    if (!targetBlog) return;

    try {
      setLoading(true);

      const response = await api.delete(
        `/blogs/${targetBlog.id}`
      );

      /* Suppression immédiate interface */
      setBlogs((prev) =>
        prev.filter(
          (b) => b.id !== targetBlog.id
        )
      );

      setBlogToDelete(null);

      showSuccess(
        'Article supprimé',
        response.data?.message ||
          `L'article "${targetBlog.title}" a été supprimé avec succès.`
      );
    } catch (err: any) {
      console.error(
        'Erreur lors de la suppression du blog:',
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        `Impossible de supprimer l'article "${targetBlog.title}".`;

      showError(
        'Suppression impossible',
        message
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     FILTRAGE
  ======================================================= */

  const filteredBlogs = blogs.filter(
    (blog) => {
      const matchesSearch =
        blog.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const blogCatId =
        getCategoryId(
          blog.category,
          blog.category_id
        );

      const matchesCategory =
        selectedCategory === '0' ||
        String(blogCatId) ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-gray-50 p-8 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Gestion des Blogs
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Gérez, rédigez et organisez vos articles de blog.
          </p>
        </div>

        {/* =================================================
            BARRE OUTILS
        ================================================= */}

        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Rechercher par titre..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">

            {/* Mode affichage */}
            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/50 p-1">

              <button
                type="button"
                onClick={() =>
                  setViewMode('table')
                }
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
                <span className="hidden md:inline">
                  Tableau
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setViewMode('grid')
                }
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden md:inline">
                  Grille
                </span>
              </button>

            </div>

            {/* Filtre catégorie */}
            <div className="relative flex-1 sm:flex-initial">

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
                className="w-full sm:w-auto appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 cursor-pointer"
              >
                <option value="0">
                  Toutes les catégories
                </option>

                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={String(cat.id)}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>

              <Filter className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />

            </div>

            {/* Créer */}
            <button
              type="button"
              onClick={
                handleOpenCreateModal
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 shrink-0 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Créer un article
            </button>

          </div>
        </div>

        {/* =================================================
            CONTENU
        ================================================= */}

        {loading ? (

          <div className="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3">

            <Loader2 className="h-8 w-8 animate-spin text-green-600" />

            <span>
              Chargement des articles...
            </span>

          </div>

        ) : error ? (

          <div className="rounded-2xl bg-red-50 p-6 text-center text-red-600 border border-red-100">
            {error}
          </div>

        ) : filteredBlogs.length === 0 ? (

          <div className="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm border border-gray-100">
            Aucun article ne correspond à votre recherche.
          </div>

        ) : viewMode === 'table' ? (

          /* =================================================
             TABLE
          ================================================= */

          <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">

                  <tr>
                    <th className="px-6 py-4">
                      Article
                    </th>

                    <th className="px-6 py-4">
                      Catégorie
                    </th>

                    <th className="px-6 py-4">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100 text-gray-700">

                  {filteredBlogs.map(
                    (blog) => (

                      <tr
                        key={blog.id}
                        className="hover:bg-gray-50/80 transition-colors"
                      >

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                              {blog.image ? (

                                <Image
                                  src={blog.image}
                                  alt={blog.title}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                />

                              ) : (

                                <div className="flex h-full w-full items-center justify-center text-green-600 bg-green-50">
                                  <FileText className="h-5 w-5" />
                                </div>

                              )}

                            </div>

                            <span className="font-semibold text-gray-900 line-clamp-1">
                              {blog.title}
                            </span>

                          </div>

                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">

                          <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                            {getCategoryName(
                              blog.category,
                              blog.category_id
                            )}
                          </span>

                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">

                          {blog.date ||
                            (
                              blog.createdAt ||
                              blog.created_at
                            )
                              ? new Date(
                                  blog.createdAt ||
                                    blog.created_at!
                                ).toLocaleDateString()
                              : '-'}

                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">

                          <div className="flex items-center justify-end gap-1">

                            {/* Aperçu */}
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedBlogForPreview(
                                  blog
                                )
                              }
                              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                              title="Aperçu"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            {/* Suppression */}
                            <button
                              type="button"
                              onClick={() =>
                                handleAskDeleteBlog(
                                  blog
                                )
                              }
                              className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition"
                              title="Supprimer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        ) : (

          /* =================================================
             GRID
          ================================================= */

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredBlogs.map(
              (blog) => (

                <div
                  key={blog.id}
                  className="group rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition"
                >

                  <div>

                    <div className="relative h-48 w-full bg-gray-100 overflow-hidden">

                      {blog.image ? (

                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />

                      ) : (

                        <div className="flex h-full w-full items-center justify-center text-gray-400 bg-gray-50">
                          <FileText className="h-10 w-10" />
                        </div>

                      )}

                    </div>

                    <div className="p-5 space-y-3">

                      <div className="flex items-center justify-between gap-2 text-xs text-gray-400">

                        <span className="rounded-md bg-gray-100 px-2 py-0.5 font-medium text-gray-600">
                          {getCategoryName(
                            blog.category,
                            blog.category_id
                          )}
                        </span>

                        <span>
                          {blog.date ||
                            (
                              blog.createdAt ||
                              blog.created_at
                            )
                              ? new Date(
                                  blog.createdAt ||
                                    blog.created_at!
                                ).toLocaleDateString()
                              : '-'}
                        </span>

                      </div>

                      <h3 className="font-bold text-gray-900 text-base line-clamp-2 group-hover:text-green-600 transition">
                        {blog.title}
                      </h3>

                    </div>

                  </div>

                  <div className="p-5 pt-0 flex items-center justify-end gap-1 border-t border-gray-50 mt-4">

                    {/* Aperçu */}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBlogForPreview(
                          blog
                        )
                      }
                      className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                      title="Aperçu"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {/* Suppression */}
                    <button
                      type="button"
                      onClick={() =>
                        handleAskDeleteBlog(
                          blog
                        )
                      }
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

      {/* ===================================================
          MODAL CRÉATION / ÉDITION
      =================================================== */}

      {isModalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between border-b border-gray-100 pb-4">

              <h2 className="text-xl font-bold text-gray-900">
                {editingBlog
                  ? "Modifier l’article"
                  : 'Nouveau Blog'}
              </h2>

              <button
                type="button"
                onClick={
                  handleCloseFormModal
                }
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <form
              onSubmit={handleSubmitForm}
              className="mt-4 space-y-4"
            >

              {/* Titre */}
              <div>

                <label className="block text-sm font-medium text-gray-700">
                  Titre
                </label>

                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  placeholder="Titre de l'article"
                />

              </div>

              {/* Catégorie */}
              <div>

                <label className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>

                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categoryId:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                >

                  <option
                    value={0}
                    disabled
                  >
                    Sélectionner une catégorie
                  </option>

                  {categories.map(
                    (cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}
                      >
                        {cat.name}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Image */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image de couverture
                </label>

                <div className="mt-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-4 hover:border-green-500 transition text-center relative bg-gray-50/50">

                  {imagePreview ? (

                    <div className="relative h-40 w-full overflow-hidden rounded-lg">

                      <Image
                        src={imagePreview}
                        alt="Aperçu"
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(
                            null
                          );
                          setImagePreview(
                            ''
                          );
                        }}
                        className="absolute top-2 right-2 rounded-full bg-red-600 p-1.5 text-white shadow-md hover:bg-red-700 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>

                    </div>

                  ) : (

                    <label className="cursor-pointer flex flex-col items-center gap-2 w-full py-4">

                      <Upload className="h-8 w-8 text-gray-400" />

                      <span className="text-sm font-medium text-gray-600">
                        Cliquez pour sélectionner un fichier image
                      </span>

                      <span className="text-xs text-gray-400">
                        PNG, JPG, WEBP jusqu'à 5 Mo
                      </span>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={
                          handleImageChange
                        }
                        className="hidden"
                      />

                    </label>

                  )}

                </div>

              </div>

              {/* Contenu */}
              <div>

                <label className="block text-sm font-medium text-gray-700">
                  Contenu
                </label>

                <textarea
                  rows={6}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content:
                        e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  placeholder="Rédigez le contenu ici..."
                />

              </div>

              {/* Boutons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">

                <button
                  type="button"
                  onClick={
                    handleCloseFormModal
                  }
                  disabled={
                    isSubmitting
                  }
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={
                    isSubmitting
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                >

                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}

                  {editingBlog
                    ? 'Mettre à jour'
                    : 'Enregistrer'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ===================================================
          MODAL APERÇU
      =================================================== */}

      {selectedBlogForPreview && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between border-b border-gray-100 pb-4">

              <h2 className="text-xl font-bold text-gray-900">
                Aperçu de l'article
              </h2>

              <button
                type="button"
                onClick={() =>
                  setSelectedBlogForPreview(
                    null
                  )
                }
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="mt-4 space-y-4">

              {selectedBlogForPreview.image && (

                <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gray-100">

                  <Image
                    src={
                      selectedBlogForPreview.image
                    }
                    alt={
                      selectedBlogForPreview.title
                    }
                    fill
                    unoptimized
                    className="object-cover"
                  />

                </div>

              )}

              <span className="inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                {getCategoryName(
                  selectedBlogForPreview.category,
                  selectedBlogForPreview.category_id
                )}
              </span>

              <h1 className="text-2xl font-bold text-gray-900">
                {
                  selectedBlogForPreview.title
                }
              </h1>

              <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed border-t border-gray-100 pt-4">
                {
                  selectedBlogForPreview.content ||
                  'Aucun contenu texte disponible.'
                }
              </div>

            </div>

          </div>

        </div>

      )}

      {/* ===================================================
          MODAL GLOBAL : SUCCÈS / ERREUR / CONFIRMATION
      =================================================== */}

      <ActionModal
        modal={actionModal}
        onClose={() => {

          /*
           * Si on ferme une confirmation de suppression
           * sans confirmer, on nettoie également le blog
           * sélectionné.
           */
          if (
            actionModal.type ===
            'confirm'
          ) {
            setBlogToDelete(null);
          }

          closeActionModal();
        }}
      />

    </div>
  );
}
