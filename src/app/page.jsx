import Hero from '../components/Hero/Hero';
import BlogList from '../components/BlogList/BlogList';
import Sidebar from '../components/Sidebar/Sidebar';
import { getPublishedPosts } from '../lib/posts';

export default async function Home() {
  const blogPosts = await getPublishedPosts();

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