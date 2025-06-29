'use client';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import BlogSection from '../components/BlogSection/BlogSection';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import { getAllBlogPosts } from '../data/blogPosts';

export default function Home() {
  const blogPosts = getAllBlogPosts();

  return (
    <>
      <Header />
      
      <main>
        <Hero />
        
        <div className="main">
          <div className="container">
            <BlogSection blogPosts={blogPosts} />
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
} 