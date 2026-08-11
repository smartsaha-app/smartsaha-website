'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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
  Edit,
  Upload
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

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBlogForPreview, setSelectedBlogForPreview] = useState<Blog | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    categoryId: 0,
    content: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Helper extraction ID catégorie
  const getCategoryId = (blogCat?: Category | number | null, blogCatId?: number): number => {
    if (typeof blogCat === 'object' && blogCat !== null) {
      return blogCat.id;
    }
    if (typeof blogCat === 'number' && blogCat > 0) {
      return blogCat;
    }
    return blogCatId || 0;
  };

  // Helper nom catégorie
  const getCategoryName = (blogCat?: Category | number | null, blogCatId?: number): string => {
    const catId = getCategoryId(blogCat, blogCatId);
    const found = categories.find((c) => c.id === catId);
    return found ? found.name : 'Non classé';
  };

  // Chargement des catégories
  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      const rawData = Array.isArray(res.data) 
        ? res.data 
        : res.data?.data || res.data?.categories || [];

      const formattedCategories: Category[] = rawData.map((cat: Category) => ({
        id: cat.id,
        name: cat.name,
      }));

      setCategories(formattedCategories);

      if (formattedCategories.length > 0) {
        setFormData((prev) => ({
          ...prev,
          categoryId: prev.categoryId || formattedCategories[0].id
        }));
      }
    } catch (err) {
      console.error('Erreur chargement catégories:', err);
    }
  };

  // Chargement des blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/blogs');

      const data = Array.isArray(res.data) 
        ? res.data 
        : res.data?.blogs || res.data?.data || [];

      setBlogs(data);
    } catch (err) {
      console.error('Erreur chargement blogs:', err);
      setError('Impossible de charger les articles.');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchBlogs(), fetchCategories()]);
  }, []);

  // Nettoyage de l'URL objet de prévisualisation
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Gestion du changement de fichier image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Ouverture du modal de création
  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      categoryId: categories.length > 0 ? categories[0].id : 0,
      content: '',
    });
    setImageFile(null);
    setImagePreview('');
    setIsModalOpen(true);
  };

  // Ouverture du modal d'édition
  const handleOpenEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      categoryId: getCategoryId(blog.category, blog.category_id),
      content: blog.content,
    });
    setImageFile(null);
    setImagePreview(blog.image || '');
    setIsModalOpen(true);
  };

  // Soumission Formulaire
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) {
      alert('Veuillez sélectionner une catégorie valide.');
      return;
    }

    if (!editingBlog && !imageFile) {
      alert('Veuillez importer une image.');
      return;
    }

    try {
      setIsSubmitting(true);

      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('excerpt', formData.title.substring(0, 150));
      dataToSend.append('categorie_id', String(formData.categoryId));
      dataToSend.append('content', formData.content);
      dataToSend.append('user_id', '1');

      if (imageFile) {
        dataToSend.append('image', imageFile);
      }

      if (editingBlog) {
        // Method spoofing pour Laravel en multipart/form-data
        dataToSend.append('_method', 'PUT');
        
        await api.post(`/blogs/${editingBlog.id}`, dataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/blogs', dataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      await fetchBlogs();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Erreur lors de l’enregistrement du blog:', err);
      alert(`Erreur lors de la ${editingBlog ? 'mise à jour' : 'création'} de l’article.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Suppression
  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;
    try {
      await api.delete(`/blogs/${blogToDelete.id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== blogToDelete.id));
      setBlogToDelete(null);
    } catch (err) {
      console.error('Erreur lors de la suppression du blog:', err);
      alert('Impossible de supprimer cet article.');
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const blogCatId = getCategoryId(blog.category, blog.category_id);
    const matchesCategory = selectedCategory === '0' || String(blogCatId) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Gestion des Blogs
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gérez, rédigez et organisez vos articles de blog.
          </p>
        </div>

        {/* Barre d'outils */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par titre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50/50 p-1">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
                <span className="hidden md:inline">Tableau</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden md:inline">Grille</span>
              </button>
            </div>

            <div className="relative flex-1 sm:flex-initial">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 cursor-pointer"
              >
                <option value="0">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
                ))}
              </select>
              <Filter className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 shrink-0 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Créer un article
            </button>
          </div>
        </div>

        {/* Contenu */}
        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            <span>Chargement des articles...</span>
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
          <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-4">Article</th>
                    <th scope="col" className="px-6 py-4">Catégorie</th>
                    <th scope="col" className="px-6 py-4">Date</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50/80 transition-colors">
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
                          <span className="font-semibold text-gray-900 line-clamp-1">{blog.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                          {getCategoryName(blog.category, blog.category_id)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                        {blog.date || (blog.createdAt || blog.created_at ? new Date(blog.createdAt || blog.created_at!).toLocaleDateString() : '-')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedBlogForPreview(blog)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                            title="Aperçu"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(blog)}
                            className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 transition"
                            title="Modifier"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setBlogToDelete(blog)}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
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
                        {getCategoryName(blog.category, blog.category_id)}
                      </span>
                      <span>{blog.date || (blog.createdAt || blog.created_at ? new Date(blog.createdAt || blog.created_at!).toLocaleDateString() : '-')}</span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base line-clamp-2 group-hover:text-green-600 transition">
                      {blog.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-end gap-1 border-t border-gray-50 mt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedBlogForPreview(blog)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                    title="Aperçu"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(blog)}
                    className="rounded-lg p-2 text-blue-500 hover:bg-blue-50 transition"
                    title="Modifier"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogToDelete(blog)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL CRÉATION / ÉDITION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingBlog ? 'Modifier l’article' : 'Nouveau Blog'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingBlog(null);
                }}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  placeholder="Titre de l'article"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                >
                  <option value={0} disabled>Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image de couverture</label>
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
                          setImageFile(null);
                          setImagePreview('');
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
                      <span className="text-xs text-gray-400">{"PNG, JPG, WEBP jusqu'à 5 Mo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contenu</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  placeholder="Rédigez le contenu ici..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingBlog(null);
                  }}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingBlog ? 'Mettre à jour' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL APERÇU */}
      {selectedBlogForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Aperçu de l&apos;article</h2>
              <button
                onClick={() => setSelectedBlogForPreview(null)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {selectedBlogForPreview.image && (
                <div className="relative h-56 w-full rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={selectedBlogForPreview.image}
                    alt={selectedBlogForPreview.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}

              <span className="inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                {getCategoryName(selectedBlogForPreview.category, selectedBlogForPreview.category_id)}
              </span>

              <h1 className="text-2xl font-bold text-gray-900">{selectedBlogForPreview.title}</h1>

              <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed border-t border-gray-100 pt-4">
                {selectedBlogForPreview.content || 'Aucun contenu texte disponible.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SUPPRESSION */}
      {blogToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Supprimer un blog</h3>
            <p className="text-sm text-gray-500">
              Êtes-vous sûr de vouloir supprimer <strong className="text-gray-700">{blogToDelete.title}</strong> ?
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBlogToDelete(null)}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDeleteBlog}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}