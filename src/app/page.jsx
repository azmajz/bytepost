'use client';

import Hero from '../components/Hero/Hero';
import BlogList from '../components/BlogList/BlogList';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAllBlogPosts } from '../data/blogPosts';

export default function Home() {
  const blogPosts = getAllBlogPosts();

  return (
    <>
        <Hero />
        <div className="main">
          <div className="container">
            <BlogList blogPosts={blogPosts} />
            <Sidebar />
          </div>
        </div>
    </>
  );
} 