'use client';

import { useState, useEffect } from 'react';
import { searchPosts, getPopularTopics } from '@/lib/posts';
import BlogCard from '@/components/BlogCard/BlogCard';
import '@/components/BlogList/BlogList.css';
import './search.css';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [popularTopics, setPopularTopics] = useState([]);

  // Fetch popular topics on component mount
  useEffect(() => {
    const fetchPopularTopics = async () => {
      try {
        const topics = await getPopularTopics();
        setPopularTopics(topics);
      } catch (error) {
        console.error('Error fetching popular topics:', error);
      }
    };

    fetchPopularTopics();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchPosts(searchQuery);
        // Transform Supabase data to match BlogCard expected format
        const transformedResults = results.map(post => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image: post.cover_image_url,
          topic: post.topic?.name || 'General',
          author: {
            name: post.author?.full_name || 'Anonymous',
            avatar: post.author?.avatar_url,
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
        setSearchResults(transformedResults);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <main className="search-page">
      <div className="container">
        <div className="search-header">
          <h1 className="search-title">Search <span className='text-accent'>BytePosts</span></h1>
          <p className="search-subtitle">
            Find the content you're looking for across all our blog posts
          </p>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Start typing to explore posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          {searchQuery && (
            <div className="search-stats">
              {isSearching ? (
                <p>Searching...</p>
              ) : (
                <p>
                  {searchResults.length === 0
                    ? 'No results found'
                    : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'}`
                  }
                </p>
              )}
            </div>
          )}
        </div>

        {searchQuery && !isSearching && (
          <div className="search-results">
            {searchResults.length === 0 ? (
              <div className="no-results">
                <p>No posts found matching "{searchQuery}"</p>
                <p>Try searching for different keywords or check your spelling.</p>
              </div>
            ) : (
              <div className="blog">
                <h2 className="h2">Search Results for "{searchQuery}"</h2>
                <div className="blog-card-group">
                  {searchResults.map((post, index) => (
                    <BlogCard key={post.id || index} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        { (!searchQuery && popularTopics.length > 0) && (
          <div className="search-suggestions">
            <h2>Popular Topics</h2>
            <div className="suggestions-grid">
              {
                popularTopics.map((topic) => (
                  <button
                    key={topic.slug}
                    className="suggestion-tag"
                    onClick={() => setSearchQuery(topic.name)}
                  >
                    {topic.name}
                  </button>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 