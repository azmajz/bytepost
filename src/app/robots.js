export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bytepost.vercel.app';

    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  }