'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  Briefcase, 
  FolderTree, 
  ArrowUpRight, 
  LayoutGrid, 
  List,
  Eye,
  Calendar,
  Loader2,
  AlertCircle,
  Tag,
  Presentation,
  Bell
} from 'lucide-react';
import { api } from '@/lib/api';

interface Blog {
  id: number;
  title: string;
  slug?: string;
  image?: string;
  cover_image?: string;
  views?: number;
  createdAt?: string;
  created_at?: string;
  category?: { id: number; name: string } | string;
  category_id?: number;
}

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [portfoliosCount, setPortfoliosCount] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Exécution parallèle des requêtes pour optimiser le temps de chargement
      const [blogsRes, portfoliosRes, categoriesRes] = await Promise.allSettled([
        api.get('/blogs'),
        api.get('/portfolios'),
        api.get('/categories')
      ]);

      // Extraction des blogs
      if (blogsRes.status === 'fulfilled') {
        const data = blogsRes.value.data;
        const fetchedBlogs = data.blogs || data.data || (Array.isArray(data) ? data : []);
        setBlogs(fetchedBlogs);
      }

      // Extraction des portfolios
      if (portfoliosRes.status === 'fulfilled') {
        const data = portfoliosRes.value.data;
        const fetchedPortfolios = data.portfolios || data.data || (Array.isArray(data) ? data : []);
        setPortfoliosCount(fetchedPortfolios.length);
      }

      // Extraction des catégories
      if (categoriesRes.status === 'fulfilled') {
        const data = categoriesRes.value.data;
        const fetchedCategories = data.categories || data.data || (Array.isArray(data) ? data : []);
        setCategoriesCount(fetchedCategories.length);
      }

    } catch (err: any) {
      console.error("Erreur lors du chargement du dashboard:", err);
      const message = err.response?.data?.message || err.message || "Erreur de chargement des données";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Calcul dynamique des statistiques
  const totalBlogs = blogs.length;

  // Calcul des articles ajoutés ce mois-ci
  const blogsThisMonth = blogs.filter(blog => {
    const dateStr = blog.createdAt || blog.created_at;
    if (!dateStr) return false;
    const blogDate = new Date(dateStr);
    const now = new Date();
    return blogDate.getMonth() === now.getMonth() && blogDate.getFullYear() === now.getFullYear();
  }).length;

  const kpiData = [
    {
      title: 'Blogs publiés',
      value: totalBlogs.toString(),
      change: `+${blogsThisMonth} ce mois`,
      icon: Bell,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Portfolio publiés',
      value: portfoliosCount.toString(),
      change: 'Projets actifs',
      icon: Presentation,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Catégories de blog',
      value: categoriesCount.toString(),
      change: 'Actives',
      icon: Tag,
      color: 'bg-green-50 text-green-600',
    },
  ];

  // Sélection des 4 plus récents articles
  const recentBlogs = blogs.slice(0, 4);

  // Formate la date pour un affichage lisible
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Récupère le nom de la catégorie (gère les objets ou chaînes de caractères)
  const getCategoryName = (category?: { id: number; name: string } | string) => {
    if (!category) return 'Général';
    if (typeof category === 'string') return category;
    return category.name || 'Général';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* En-tête de la page */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Tableau de bord
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Aperçu des performances de votre site web Smartsaha.
            </p>
          </div>
        </div>

        {/* Handling Global Error */}
        {error && (
          <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-800 border border-red-200">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <div className="flex-1 text-sm">{error}</div>
            <button 
              onClick={fetchDashboardData}
              className="text-xs font-semibold underline hover:no-underline"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Section KPI */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{kpi.title}</span>
                  <div className={`rounded-xl p-3 ${kpi.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400 mt-2" />
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">{kpi.value}</span>
                  )}
                  <span className="bg-purple-50 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full border border-[#10b481]/20">
                    {kpi.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section des blogs récents */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          
          {/* En-tête du tableau / grille avec boutons commutateurs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Derniers blogs publiés</h2>
              <p className="text-xs text-gray-500 mt-0.5">Liste des articles récemment ajoutés au site</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Commutateur de vue */}
              <div className="flex items-center rounded-xl bg-gray-100 p-1 border border-gray-200">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  aria-label="Affichage en tableau"
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    viewMode === 'table'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">Tableau</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Affichage en grille"
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Grille</span>
                </button>
              </div>

              <Link
                href="/blogs"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#10b481] hover:text-[#0e9b6e] transition"
              >
                Voir tout
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* État de chargement */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#10b481] mb-2" />
              <p className="text-sm text-gray-500">Chargement des articles récents...</p>
            </div>
          )}

          {/* Aucun article */}
          {!loading && recentBlogs.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">
              Aucun article publié pour le moment.
            </div>
          )}

          {/* VUE TABLEAU */}
          {!loading && recentBlogs.length > 0 && viewMode === 'table' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">Article</th>
                    <th scope="col" className="px-6 py-3.5">Date</th>
                    <th scope="col" className="px-6 py-3.5">Catégorie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {recentBlogs.map((blog) => {
                    const imageUrl = blog.cover_image || blog.image;
                    return (
                      <tr key={blog.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                              {imageUrl ? (
                                <Image
                                  src={imageUrl}
                                  alt={blog.title}
                                  fill
                                  sizes="64px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                                  No image
                                </div>
                              )}
                            </div>
                            <span className="font-semibold text-gray-900 line-clamp-1 max-w-md">
                              {blog.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {formatDate(blog.createdAt || blog.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                            {getCategoryName(blog.category)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* VUE GRILLE */}
          {!loading && recentBlogs.length > 0 && viewMode === 'grid' && (
            <div className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recentBlogs.map((blog) => {
                const imageUrl = blog.cover_image || blog.image;
                return (
                  <div
                    key={blog.id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:border-gray-200 hover:shadow-sm"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={blog.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          Sans image
                        </div>
                      )}
                      <span className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                        {getCategoryName(blog.category)}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-4">
                      <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-[#10b481] transition">
                        {blog.title}
                      </h3>

                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{formatDate(blog.createdAt || blog.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}