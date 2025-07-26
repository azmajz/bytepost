export default function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bytepost.vercel.app';
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      // {
      //   url: `${baseUrl}/blog`,
      //   lastModified: new Date(),
      //   changeFrequency: 'weekly',
      //   priority: 0.5,
      // },
    ]
  }