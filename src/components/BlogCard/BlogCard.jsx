import { IoTimeOutline } from 'react-icons/io5';
import Link from 'next/link';
import BlogImagePlaceholder from '../Placeholder/BlogImagePlaceholder';
import AuthorImagePlaceholder from '../Placeholder/AuthorImagePlaceholder';
import './BlogCard.css';

export default function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <div className="blog-card-banner">
        {post.image ? (
          <img 
            src={post.image} 
            alt={post.title}
            width="250" 
            className="blog-banner-img" 
          />
        ) : (
          <BlogImagePlaceholder />
        )}
      </div>

      <div className="blog-card-wrapper">
        <button className="blog-topic text-tiny">{post.topic}</button>

        <h3>
          <Link href={`/post/${post.slug}`} className="h3">
            {post.title}
          </Link>
        </h3>

        <p className="blog-text">
          {post.excerpt}
        </p>

        <div className="wrapper-flex">
          <div className="profile-wrapper">
            {post.author.avatar ? (
              <img src={post.author.avatar} alt={post.author.name} width="50" />
            ) : (
              <AuthorImagePlaceholder />
            )}
          </div>

          <div className="wrapper">
            <a href="#" className="h4">{post.author.name}</a>

            <p className="text-sm">
              <time dateTime={post.date}>{post.date}</time>
              <span className="separator"></span>
              <IoTimeOutline />
              <time dateTime="PT3M">{post.readTime}</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 