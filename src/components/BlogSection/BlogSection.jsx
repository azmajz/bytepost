import BlogCard from '../BlogCard/BlogCard';
import './BlogSection.css';

export default function BlogSection({ blogPosts }) {
  return (
    <div className="blog">
      <h2 className="h2">Latest Blog Post</h2>

      <div className="blog-card-group">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <button className="btn load-more">Load More</button>
    </div>
  );
} 