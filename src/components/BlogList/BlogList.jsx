import BlogCard from '../BlogCard/BlogCard';
import './BlogList.css';

export default function BlogList({ blogPosts }) {
  return (
    <div className="blog">
      <h2 className="h2">Latest Posts</h2>

      <div className="blog-card-group">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <button className="btn load-more">Load More</button>
    </div>
  );
} 