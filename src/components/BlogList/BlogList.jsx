import BlogCard from '../BlogCard/BlogCard';
import './BlogList.css';

export default function BlogList({ blogPosts }) {

  const transformedPosts = blogPosts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    image: post.cover_image_url || '/placeholder.png',
    topic: post.topic?.name || 'General',
    author: {
      name: post.author?.full_name || 'Anonymous',
      avatar: post.author?.avatar_url || '/author.png',
      username: post.author?.username || 'anonymous'
    },
    date: new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    readTime: `${post.read_time || 2} min read`,
    tags: [], // You can add tags later if needed
    views: post.view_count || 0,
    likes: post.like_count || 0
  }));

  return (
    <div className="blog">
      <h2 className="h2">Latest Posts</h2>

      <div className="blog-card-group">
        {transformedPosts.map((post, index) => (
          <BlogCard key={post.id || index} post={post} />
        ))}
      </div>

      <button className="btn load-more">Load More</button>
    </div>
  );
} 