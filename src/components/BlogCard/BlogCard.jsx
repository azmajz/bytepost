import { IoTimeOutline } from 'react-icons/io5';
import Link from 'next/link';
import './BlogCard.css';

export default function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <div className="blog-card-banner">
        <img 
          src={post.image} 
          alt={post.title}
          width="250" 
          className="blog-banner-img" 
        />
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
            <img src="/author.png" alt="Julia Walker" width="50" />
          </div>

          <div className="wrapper">
            <a href="#" className="h4">Julia Walker</a>

            <p className="text-sm">
              <time dateTime="2022-01-17">{post.date}</time>
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