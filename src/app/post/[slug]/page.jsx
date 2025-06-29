import BlogDetail from '../../../components/BlogDetail/BlogDetail';
import { getBlogPostBySlug } from '../../../data/blogPosts';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }) {
  // Await params before accessing its properties
  const { slug } = await params;
  
  // Get the blog post data based on the slug
  const post = getBlogPostBySlug(slug);
  
  // If post is not found, show 404 page
  if (!post) {
    notFound();
  }
  
  return <BlogDetail post={post} />;
} 