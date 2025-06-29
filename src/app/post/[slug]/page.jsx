import BlogDetail from '../../../components/BlogDetail/BlogDetail';
import { getPostBySlug } from '../../../lib/posts';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
 return {}
}

export default async function BlogPostPage({ params }) {
  // Await params before accessing its properties
  const { slug } = await params;
  
  // Get the blog post data from Supabase based on the slug
  const post = await getPostBySlug(slug);
  
  // If post is not found, show 404 page
  if (!post) {
    notFound();
  }
  
  return <BlogDetail post={post} />;
} 