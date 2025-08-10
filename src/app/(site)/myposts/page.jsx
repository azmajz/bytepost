'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { MdArrowBack, MdEdit, MdDelete, MdVisibility, MdVisibilityOff, MdOutlineDrafts, MdFolder, MdImage, MdAccessTime, MdRemoveRedEye, MdThumbUp, MdGridOn, MdViewList } from 'react-icons/md';
import { TbWorldUpload, TbWorldCheck, TbWorldX } from "react-icons/tb";
import { useAuth } from '@/context/AuthContext';
import { getUserPosts, deletePost, updatePost } from '@/lib/posts';
import './myposts.css';

export default function MyPostsPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isLoading, setIsLoading] = useState(true);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [publishingPostId, setPublishingPostId] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Fetch user posts
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserPosts();
    }
  }, [isAuthenticated, user]);

  // Filter posts based on active tab
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredPosts(posts);
    } else if (activeTab === 'published') {
      setFilteredPosts(posts.filter(post => post.published));
    } else if (activeTab === 'drafts') {
      setFilteredPosts(posts.filter(post => !post.published));
    }
  }, [posts, activeTab]);

  const fetchUserPosts = async () => {
    try {
      setIsLoading(true);
      const userPosts = await getUserPosts(user.id);
      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      toast.error('Failed to load your posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingPostId(postId);
      await deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setDeletingPostId(null);
    }
  };

  const handlePublishPost = async (postId) => {
    try {
      setPublishingPostId(postId);
      await updatePost(postId, { published: true });
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, published: true } : post
      ));
      toast.success('Post published successfully');
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to publish post');
    } finally {
      setPublishingPostId(null);
    }
  };

  const handleUnpublishPost = async (postId) => {
    try {
      setPublishingPostId(postId);
      await updatePost(postId, { published: false });
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, published: false } : post
      ));
      toast.success('Post unpublished successfully');
    } catch (error) {
      console.error('Error unpublishing post:', error);
      toast.error('Failed to unpublish post');
    } finally {
      setPublishingPostId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="myposts-page">
        <div className="myposts-container">
          <div className="loading-state">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="myposts-page">
      <div className="myposts-header">
        <div className="myposts-header-content">
          <div className="myposts-header-left">
            <Link href="/" className="myposts-back-btn">
              <MdArrowBack size={20} />
            </Link>
            <div className="myposts-nav">
              <Link href="/write" className="nav-item">
                <MdFolder size={20} />
                <span>Write</span>
              </Link>
              <span className="nav-separator">/</span>
              <div className="nav-item active">
                <MdOutlineDrafts size={20} />
                <span>My Posts</span>
              </div>
            </div>
          </div>
          
          <div className="myposts-header-right">
            <Link href="/write" className="new-post-btn">
              Write New Post
            </Link>
          </div>
        </div>
      </div>

      <div className="myposts-container">
        <div className="myposts-content">
          <div className="myposts-controls">
            <div className="myposts-tabs">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Posts ({posts.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'published' ? 'active' : ''}`}
                onClick={() => setActiveTab('published')}
              >
                Published ({posts.filter(post => post.published).length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'drafts' ? 'active' : ''}`}
                onClick={() => setActiveTab('drafts')}
              >
                Drafts ({posts.filter(post => !post.published).length})
              </button>
            </div>

            <div className="view-toggle">
              <button 
                className={`mp-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <MdGridOn size={20} />
              </button>
              <button 
                className={`mp-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <MdViewList size={20} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-state">
              <p>Loading your posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <MdOutlineDrafts size={48} />
              </div>
              <h3>No posts found</h3>
              <p>
                {activeTab === 'all' && 'You haven\'t created any posts yet.'}
                {activeTab === 'published' && 'You haven\'t published any posts yet.'}
                {activeTab === 'drafts' && 'You don\'t have any drafts saved.'}
              </p>
              <Link href="/write" className="create-post-btn">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className={`posts-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
              {filteredPosts.map(post => (
                <div key={post.id} className={`post-card ${viewMode === 'list' ? 'list-card' : 'grid-card'}`}>
                  {viewMode === 'grid' ? (
                    // Grid View Layout
                    <>
                      <div className="post-header">
                        <div className="post-status">
                          {post.published ? (
                            <span className="status-badge published">
                              <TbWorldCheck size={14} />
                              Published
                            </span>
                          ) : (
                            <span className="status-badge draft">
                              <TbWorldX size={14} />
                              Draft
                            </span>
                          )}
                        </div>
                        <div className="post-actions">                          
                          {!post.published ? (
                            <button 
                              className="mp-action-btn mp-publish-btn"
                              onClick={() => handlePublishPost(post.id)}
                              disabled={publishingPostId === post.id}
                              title="Publish Post"
                            >
                              <TbWorldUpload size={18} />
                            </button>
                          ) : (
                            <button 
                              className="mp-action-btn mp-unpublish-btn"
                              onClick={() => handleUnpublishPost(post.id)}
                              disabled={publishingPostId === post.id}
                              title="Unpublish Post"
                            >
                              <TbWorldX size={18} />
                            </button>
                          )}
                          
                          <Link href={`/write?edit=${post.id}`} className="mp-action-btn mp-edit-btn" title="Edit Post">
                            <MdEdit size={18} />
                          </Link>

                          <button 
                            className="mp-action-btn mp-delete-btn"
                            onClick={() => handleDeletePost(post.id)}
                            disabled={deletingPostId === post.id}
                            title="Delete Post"
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="post-image">
                        {post.cover_image_url ? (
                          <img src={post.cover_image_url} alt={post.title} />
                        ) : (
                          <div className="post-image-placeholder">
                            <MdImage size={32} />
                          </div>
                        )}
                      </div>
                      
                      <div className="post-content">
                        <div className="post-meta">
                          <span className="post-date">{formatDate(post.created_at)}</span>
                          {post.topic && (
                            <span className="post-topic">{post.topic.name}</span>
                          )}
                        </div>
                        
                        <h3 className="post-title">{post.title || 'Untitled'}</h3>
                        
                        <p className="post-excerpt">
                          {post.excerpt || 'No content preview available...'}
                        </p>
                        
                        <div className="post-stats">
                          <div className="stat-item">
                            <MdAccessTime size={14} />
                            <span>{getReadTime(post.content)} min read</span>
                          </div>
                          {post.published && (
                            <>
                              <div className="stat-item">
                                <MdRemoveRedEye size={14} />
                                <span>{post.view_count || 0}</span>
                              </div>
                              <div className="stat-item">
                                <MdThumbUp size={14} />
                                <span>{post.like_count || 0}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View Layout
                    <>
                      <div className="list-card-image">
                        {post.cover_image_url ? (
                          <img src={post.cover_image_url} alt={post.title} />
                        ) : (
                          <div className="post-image-placeholder">
                            <MdImage size={24} />
                          </div>
                        )}
                      </div>
                      
                      <div className="list-card-content">
                        <div className="list-card-header">
                          <div className="list-card-meta">
                            <div className="post-status">
                              {post.published ? (
                                <span className="status-badge published">
                                  <TbWorldCheck size={14} />
                                  Published
                                </span>
                              ) : (
                                <span className="status-badge draft">
                                  <TbWorldX size={14} />
                                  Draft
                                </span>
                              )}
                            </div>
                            <span className="post-date">{formatDate(post.created_at)}</span>
                            {post.topic && (
                              <span className="post-topic">{post.topic.name}</span>
                            )}
                          </div>
                          
                          <div className="post-actions">
                                                 
                            {!post.published ? (
                              <button 
                                className="mp-action-btn mp-publish-btn"
                                onClick={() => handlePublishPost(post.id)}
                                disabled={publishingPostId === post.id}
                                title="Publish Post"
                              >
                                <TbWorldUpload size={18} />
                              </button>
                            ) : (
                              <button 
                                className="mp-action-btn mp-unpublish-btn"
                                onClick={() => handleUnpublishPost(post.id)}
                                disabled={publishingPostId === post.id}
                                title="Unpublish Post"
                              >
                                <TbWorldX size={18} />
                              </button>
                            )}
                            
                            <Link href={`/write?edit=${post.id}`} className="mp-action-btn mp-edit-btn" title="Edit Post">
                              <MdEdit size={18} />
                            </Link>

                            <button 
                              className="mp-action-btn mp-delete-btn"
                              onClick={() => handleDeletePost(post.id)}
                              disabled={deletingPostId === post.id}
                              title="Delete Post"
                            >
                              <MdDelete size={18} />
                            </button>
                          </div>
                        </div>
                        
                        <h3 className="post-title">{post.title || 'Untitled'}</h3>
                        
                        <p className="post-excerpt">
                          {post.excerpt || 'No content preview available...'}
                        </p>
                        
                        <div className="post-stats">
                          <div className="stat-item">
                            <MdAccessTime size={14} />
                            <span>{getReadTime(post.content)} min read</span>
                          </div>
                          {post.published && (
                            <>
                              <div className="stat-item">
                                <MdRemoveRedEye size={14} />
                                <span>{post.view_count || 0} views</span>
                              </div>
                              <div className="stat-item">
                                <MdThumbUp size={14} />
                                <span>{post.like_count || 0} likes</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
