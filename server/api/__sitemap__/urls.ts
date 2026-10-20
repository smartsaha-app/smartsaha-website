// Sitemap dynamique : ajoute les articles et les projets de l'API 
// Pas encore de slug dans l'API : on utilise l'id (le slug viendra avec DEV-04)
export default defineSitemapEventHandler(async () => {
  const apiBase = useRuntimeConfig().public.apiBase

  // On récupère les articles et les projets ; en cas d'erreur, liste vide
  const [repBlogs, repProjets] = await Promise.all([
    $fetch<any>(`${apiBase}/blogs/list`).catch(() => null),
    $fetch<any>(`${apiBase}/portfolios/list`).catch(() => null),
  ])

  const blogs = repBlogs?.blogs ?? []
  const projets = repProjets?.portfolios ?? []

  return [
    ...blogs.map((b: any) => ({
      loc: `/blogs/${b.slug ?? b.id}`,
      lastmod: b.updatedAt,
      _i18nTransform: true, 
    })),
    ...projets.map((p: any) => ({
      loc: `/portfolio/${p.slug ?? p.id}`,
      lastmod: p.updatedAt,
      _i18nTransform: true,
    })),
  ]
})