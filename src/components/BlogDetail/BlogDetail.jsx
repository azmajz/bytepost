'use client';

import { IoTimeOutline, IoAnalyticsOutline, IoHeartOutline, IoShareOutline, IoBookmarkOutline, IoSaveOutline } from 'react-icons/io5';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState, useMemo, useCallback } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import './BlogDetail.css';

export default function BlogDetail({ post }) {
  const [quillContent, setQuillContent] = useState(post.content);
  // Memoize the transformation function
  const transformQuillContent = useCallback((content) => {
    if (!content) return '';
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    // Find all Quill code block containers
    const codeBlocks = tempDiv.querySelectorAll('.ql-code-block-container');

    codeBlocks.forEach(container => {
      // Get all code lines
      const codeLines = Array.from(container.querySelectorAll('.ql-code-block'))
        .map(line => line.textContent)
        .join('\n');

      // Get the language from the first code block div
      let language = container.querySelector('.ql-code-block')?.getAttribute('data-language');
      let highlightedCode;

      // Create highlighted code
      if (hljs.getLanguage(language)) {
        // If language is supported, use it
        highlightedCode = hljs.highlight(codeLines, { language }).value;
      } else {
        // Otherwise use auto-detection
        const hljsAuto = hljs.highlightAuto(codeLines);
        language = hljsAuto.language;
        highlightedCode = hljsAuto.value;
      }

      // Create new pre element with highlighted code
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      pre.className = `language-${language}`;
      code.innerHTML = highlightedCode;
      pre.appendChild(code);

      container.replaceWith(pre);
    });

    return tempDiv.innerHTML;
  }, []);

  // Update quillContent when post.content changes
  useEffect(() => {
    setQuillContent(transformQuillContent(post.content));
  }, [post.id]);

  // Memoize transformedPost based on post
  const transformedPost = useMemo(() => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    readTime: `${post.read_time || 5} min read`,
    views: post.view_count || 0,
    likes: post.like_count || 0,
    date: new Date(post.created_at).toISOString(),
    topic: post.topic?.name || 'General',
    author: {
      name: post.author?.full_name || 'Anonymous',
      avatar: post.author?.avatar_url || '/author.png'
    },
    image: post.cover_image_url || '/placeholder.png',
    tags: []
  }), [post.id]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = transformedPost.title;
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

  return (
    <div className="blog-detail-main">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-container">
          {/* Hero Content */}
          <div className="hero-content">              
            <h1 className="hero-title">{transformedPost.title}</h1>
            {/* <p className="hero-subtitle">{transformedPost.excerpt}</p> */}
            <div className="hero-meta">
              <span className="topic-badge">{transformedPost.topic}</span>
              <div className="hero-stats">
                <div className="stats-group">
                  <span className="stat">
                    <IoTimeOutline />
                    {transformedPost.readTime}
                  </span>
                  <span className="dot">·</span>
                  <span className="stat">
                    {new Date(transformedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <span className="stat">
                  <IoAnalyticsOutline />
                  {transformedPost.views.toLocaleString()} views
                </span>
              </div>
            </div>

            {/* <div className="author-section">
              <div className="author-info">
                <img src={transformedPost.author.avatar} alt={transformedPost.author.name} className="author-avatar" />
                <div className="author-details">
                  <h3 className="author-name">{transformedPost.author.name}</h3>
                  <span>Author</span>
                  <p className="post-date">{new Date(transformedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
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
            <img src={transformedPost.image} alt={transformedPost.title} className="hero-image" />
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
              dangerouslySetInnerHTML={{ __html: quillContent }}
            />
            {/* Article Footer */}
            <div className="article-footer">
              <div className="article-tags">
                {transformedPost.tags.map((tag, index) => (
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
    </div>
  );
} 