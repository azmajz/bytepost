'use client';

import { IoTimeOutline, IoAnalyticsOutline, IoHeartOutline, IoShareOutline, IoBookmarkOutline, IoSaveOutline } from 'react-icons/io5';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './BlogDetail.css';

export default function BlogDetail({ post }) {
  const [tocItems, setTocItems] = useState([]);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    // Extract headings from content and create TOC
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    const headings = tempDiv.querySelectorAll('h2, h3');
    
    const items = Array.from(headings).map((heading, index) => {
      const id = heading.textContent.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Add ID to the heading
      heading.id = id;
      
      return {
        id,
        text: heading.textContent,
        level: heading.tagName.toLowerCase()
      };
    });
    
    setTocItems(items);
  }, [post.content]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    if (platform === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    } else if (platform === 'linkedin') {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      window.open(linkedinUrl, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  const toggleToc = () => {
    setIsTocOpen(!isTocOpen);
  };

  return (
    <div className="blog-detail-main">
      {/* Floating TOC Button */}
      {tocItems.length > 0 && (
        <button className="floating-toc-btn" onClick={toggleToc}>
          <IoMenuOutline />
        </button>
      )}

      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-container">

          
          {/* Hero Content */}
          <div className="hero-content">              
            <h1 className="hero-title">{post.title}</h1>
            {/* <p className="hero-subtitle">{post.excerpt}</p> */}


            <div className="hero-meta">
              <span className="topic-badge">{post.topic}</span>
              <div className="hero-stats">

                <div className="stats-group">
                  <span className="stat">
                    <IoTimeOutline />
                    {post.readTime}
                  </span>
                  <span className="dot">·</span>
                  <span className="stat">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
        
                <span className="stat">
                  <IoAnalyticsOutline />
                  {post.views.toLocaleString()} views
                </span>
              </div>
            </div>
            
            {/* <div className="author-section">
              <div className="author-info">
                <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                <div className="author-details">
                  <h3 className="author-name">{post.author.name}</h3>
                  <span>Author</span>
                  <p className="post-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
              <div className="author-actions">
                <button className="icon-btn" title="Save"><IoSaveOutline /></button>
                <button className="icon-btn" title="Bookmark"><IoBookmarkOutline /></button>
                <button className="icon-btn" title="Share" onClick={() => handleShare('copy')}><IoShareOutline /></button>
              </div>
            </div> */}
          </div>

          {/* Hero Image */}
          <div className="hero-image-container">
            <img src={post.image} alt={post.title} className="hero-image" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="blog-content-wrapper">
        <div className="content-container">
          {/* Article Content */}
          <article className="article-content">
            <div 
              className="article-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Article Footer */}
            <div className="article-footer">
              <div className="article-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="article-share">
                <h4>Share this article</h4>
                <div className="share-buttons">
                  <button className="share-btn twitter" onClick={() => handleShare('twitter')}>
                    <FaTwitter />
                    Twitter
                  </button>
                  <button className="share-btn linkedin" onClick={() => handleShare('linkedin')}>
                    <FaLinkedin />
                    LinkedIn
                  </button>
                  <button className="share-btn copy" onClick={() => handleShare('copy')}>
                    <IoShareOutline />
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Table of Contents Sidebar */}
      {tocItems.length > 0 && (
        <div className={`toc-sidebar ${isTocOpen ? 'toc-open' : ''}`}>
          <div className="toc-header">
            <h3>Table of Contents</h3>
            <button className="toc-close-btn" onClick={toggleToc}>
              <IoCloseOutline />
            </button>
          </div>
          <nav className="toc-nav">
            {tocItems.map((item, index) => (
              <a 
                key={index} 
                href={`#${item.id}`} 
                className={`toc-link ${item.level === 'h3' ? 'toc-link-h3' : ''}`}
                onClick={() => setIsTocOpen(false)}
              >
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Backdrop for TOC */}
      {isTocOpen && (
        <div className="toc-backdrop" onClick={toggleToc}></div>
      )}
    </div>
  );
} 