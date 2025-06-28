'use client';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import BlogSection from '../components/BlogSection/BlogSection';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';


export default function Home() {
  const blogPosts = [
    {
      id: 1,
      title: "Building microservices with Dropwizard, MongoDB & Docker",
      topic: "Database",
      image: "/blog-1.png",
      excerpt: "This NoSQL database oriented to documents (by documents like JSON) combines some of the features from relational databases, easy to use and the multi-platform is the best option for scale up and have fault tolerance, load balancing, map reduce, etc.",
      date: "Jan 17, 2022",
      readTime: "3 min"
    },
    {
      id: 2,
      title: "Fast web page loading on a $20 feature phone",
      topic: "Web Performance",
      image: "/blog-2.png",
      excerpt: "Feature phones are affordable (under $20-25), low-end devices enabling 100s of millions of users in developing countries to leverage the web. Think of them as a light version of a smart phone.",
      date: "Dec 10, 2021",
      readTime: "2 min"
    },
    {
      id: 3,
      title: "Accessibility Tips for Web Developers",
      topic: "Accessibility",
      image: "/blog-3.png",
      excerpt: "It's awesome to build sites that are inclusive and accessible to everyone. There are at least six key areas of disability we can optimize for: visual, hearing, mobility, cognition, speech and neural.",
      date: "Nov 28, 2021",
      readTime: "4 min"
    },
  ];

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