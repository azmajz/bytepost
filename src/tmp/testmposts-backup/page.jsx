'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPublishedPostsByUser, getDraftPostsByUser, updatePost, deletePost } from '@/lib/posts';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IoEyeOutline, IoEyeOffOutline, IoTrashOutline, IoCreateOutline, IoTimeOutline, IoStatsChartOutline, IoCalendarOutline } from 'react-icons/io5';
import Link from 'next/link';
import './testmposts.css';

export default function MyPostsPage() {
  const { user, isAuthenticated } = useAuth();
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [draftPosts, setDraftPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('published');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchUserPosts();
  }, [isAuthenticated, user]);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const [published, drafts] = await Promise.all([
        getPublishedPostsByUser(user.id),
        getDraftPostsByUser(user.id)
      ]);
      setPublishedPosts(published);
      setDraftPosts(drafts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (postId, currentPublished) => {
    try {
      await updatePost(postId, { published: !currentPublished });
      toast.success(currentPublished ? 'Post unpublished' : 'Post published');
      fetchUserPosts(); // Refresh the list
    } catch (error) {
      console.error('Error toggling publish status:', error);
      toast.error('Failed to update post status');
    }
  };

  const handleDeletePost = async (postId, postTitle) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      return;
    }

    try {
      await deletePost(postId);
      toast.success('Post deleted successfully');
      fetchUserPosts(); // Refresh the list
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderPostCard = (post) => (
    <div key={post.id} className="post-card">
      <div className="post-card-header">
        <div className="post-status">
          {post.published ? (
            <span className="status-badge published">
              <IoEyeOutline />
              Published
            </span>
          ) : (
            <span className="status-badge draft">
              <IoEyeOffOutline />
              Draft
            </span>
          )}
        </div>
        <div className="post-actions">
          <Link href={`/write?edit=${post.id}`} className="action-btn edit">
            <IoCreateOutline />
            Edit
          </Link>
          <button
            onClick={() => handleTogglePublish(post.id, post.published)}
            className={`action-btn ${post.published ? 'unpublish' : 'publish'}`}
          >
            {post.published ? <IoEyeOffOutline /> : <IoEyeOutline />}
            {post.published ? 'Unpublish' : 'Publish'}
          </button>
          <button
            onClick={() => handleDeletePost(post.id, post.title)}
            className="action-btn delete"
          >
            <IoTrashOutline />
            Delete
          </button>
        </div>
      </div>

      <div className="post-card-content">
        <div className="post-image">
          {post.cover_image_url ? (
            <img src={post.cover_image_url} alt={post.title} />
          ) : (
            <div className="placeholder-image">
              <IoCreateOutline />
            </div>
          )}
        </div>

        <div className="post-details">
          <h3 className="post-title">
            {post.published ? (
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            ) : (
              post.title
            )}
          </h3>
          
          <p className="post-excerpt">
            {post.excerpt || 'No excerpt available'}
          </p>

          <div className="post-meta">
            <div className="meta-item">
              <IoCalendarOutline />
              <span>{formatDate(post.created_at)}</span>
            </div>
            {post.topic && (
              <div className="meta-item">
                <span className="topic-badge">{post.topic.name}</span>
              </div>
            )}
            {post.read_time && (
              <div className="meta-item">
                <IoTimeOutline />
                <span>{post.read_time} min read</span>
              </div>
            )}
            {post.view_count && (
              <div className="meta-item">
                <IoStatsChartOutline />
                <span>{post.view_count} views</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="myposts-container">
      <div className="container">
        <div className="myposts-header">
          <div className="header-content">
            <h1 className="page-title">My Posts</h1>
            <p className="page-subtitle">Manage your published posts and drafts</p>
          </div>
          <Link href="/write" className="write-btn">
            <IoCreateOutline />
            Write New Post
          </Link>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon published">
              <IoEyeOutline />
            </div>
            <div className="stat-content">
              <h3>{publishedPosts.length}</h3>
              <p>Published Posts</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon draft">
              <IoEyeOffOutline />
            </div>
            <div className="stat-content">
              <h3>{draftPosts.length}</h3>
              <p>Draft Posts</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon total">
              <IoStatsChartOutline />
            </div>
            <div className="stat-content">
              <h3>{publishedPosts.length + draftPosts.length}</h3>
              <p>Total Posts</p>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'published' ? 'active' : ''}`}
              onClick={() => setActiveTab('published')}
            >
              <IoEyeOutline />
              Published ({publishedPosts.length})
            </button>
            <button
              className={`tab ${activeTab === 'drafts' ? 'active' : ''}`}
              onClick={() => setActiveTab('drafts')}
            >
              <IoEyeOffOutline />
              Drafts ({draftPosts.length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your posts...</p>
          </div>
        ) : (
          <div className="posts-section">
            {activeTab === 'published' && (
              <div className="posts-grid">
                {publishedPosts.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <IoCreateOutline />
                    </div>
                    <h3>No published posts yet</h3>
                    <p>Start writing to see your published posts here</p>
                    <Link href="/write" className="write-btn">
                      Write Your First Post
                    </Link>
                  </div>
                ) : (
                  publishedPosts.map(renderPostCard)
                )}
              </div>
            )}

            {activeTab === 'drafts' && (
              <div className="posts-grid">
                {draftPosts.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <IoEyeOffOutline />
                    </div>
                    <h3>No drafts yet</h3>
                    <p>Save your work as drafts to see them here</p>
                    <Link href="/write" className="write-btn">
                      Start Writing
                    </Link>
                  </div>
                ) : (
                  draftPosts.map(renderPostCard)
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
