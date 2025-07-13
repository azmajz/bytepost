import BlogDetail from '@/components/BlogDetail/BlogDetail';
import { getPostBySlug, getPostMetadata } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postMeta = await getPostBySlug(slug);

  if (!postMeta) {
    return {}  
  }
  const {title, excerpt:description, cover_image_url } = postMeta

  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_URL}/post/${slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [cover_image_url],
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [cover_image_url],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}


export default async function BlogPostPage({ params }) {
  // Await params before accessing its properties
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  // If post is not found, show 404 page
  if (!post) {
    notFound();
  }

  return <BlogDetail post={post} />;
} 