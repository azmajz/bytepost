'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { MdArrowBack, MdImage, MdUpload, MdOutlineDrafts, MdFolder } from 'react-icons/md';
import './write.css';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const tagInputRef = useRef(null);

  useEffect(() => {
    // Initialize Quill editor
    if (typeof window !== 'undefined' && window.Quill && editorRef.current) {
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image']
      ];

      quillRef.current = new window.Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: '✨ Write your post here...',
        bounds: editorRef.current
      });

      // Handle content changes
      quillRef.current.on('text-change', () => {
        const content = quillRef.current.root.innerHTML;
        setContent(content);
        autoSave();
      });

      // Focus the editor
      quillRef.current.focus();
    }
  }, []);

  const autoSave = async () => {
    if (title.trim() || content.trim()) {
      setIsSaving(true);
      try {
        // Simulate auto-save
        await new Promise(resolve => setTimeout(resolve, 500));
        setLastSaved(new Date());
        setIsSaving(false);
      } catch (error) {
        console.error('Auto-save failed:', error);
        setIsSaving(false);
      }
    }
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title for your post');
      return;
    }

    if (!content.trim()) {
      toast.error('Please add some content to your post');
      return;
    }

    setIsPublishing(true);
    try {
      // Simulate publishing
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Post published successfully!');
      // Reset form
      setTitle('');
      setContent('');
      if (quillRef.current) {
        quillRef.current.setText('');
      }
      setLastSaved(null);
    } catch (error) {
      toast.error('Failed to publish post');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate saving draft
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Draft saved successfully!');
      setLastSaved(new Date());
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(e);
    }
  };

  const topics = [
    'Technology',
    'Programming',
    'Web Development',
    'Design',
    'Business',
    'Productivity',
    'Tutorial',
    'Opinion',
    'News',
    'Review'
  ];

  return (
    <div className="write-page">
      <div className="write-header">
        <div className="write-header-content">
          <div className="write-header-left">
            <Link href="/" className="write-back-btn">
              <MdArrowBack size={20} />
            </Link>
            <div className="write-nav">
              <Link href="/posts" className="nav-item">
                <MdFolder size={20} />
                <span>Posts</span>
              </Link>
              <span className="nav-separator">/</span>
              <Link href="/drafts" className="nav-item">
                <MdOutlineDrafts size={20} />
                <span>Drafts</span>
              </Link>
              <div className="save-status">
                {isSaving ? 'Saving...' : lastSaved ? 'Saved' : 'Draft'}
              </div>
            </div>
          </div>
          
          <div className="write-header-right">
            <button 
              className="save-draft-btn"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button 
              className="publish-btn"
              onClick={handlePublish}
              disabled={isPublishing || !title.trim() || !content.trim()}
            >
              {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      <div className="write-container">
        <div className="write-content">
          <div className="write-title-section">
            <textarea
              className="write-title-input"
              placeholder="Write your title here..."
              maxLength={100}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="write-cover-section">
            {coverImage ? (
              <div className="cover-image-container">
                <img src={coverImage} alt="Cover" className="cover-image" />
                <button className="remove-cover-btn" onClick={removeCoverImage}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="cover-upload-area" onClick={() => fileInputRef.current?.click()}>
                <div className="upload-icon-container">
                  <MdImage size={48} className="image-icon" />
                  <MdUpload size={24} className="upload-icon" />
                </div>
                <h2>Add a cover image</h2>
                <p>Drag and drop or click to upload</p>
                <span className="file-info">Recommended: High-quality image (JPEG, PNG)</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="cover-file-input"
              style={{ display: 'none' }}
            />
          </div>

          <div className="write-editor-section">
            <div ref={editorRef} className="write-editor"></div>
          </div>
        </div>

        <div className="write-sidebar">
          <div className="write-sidebar-section">
            <h3 className="write-sidebar-title">Topic</h3>
            <div className="topic-selector">
              <select 
                value={selectedTopic} 
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="topic-select"
              >
                <option value="">Select a topic</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="write-sidebar-section">
            <h3 className="write-sidebar-title">Tags</h3>
            <div className="tags-container">
              <div className="tags-input-container">
                <input
                  ref={tagInputRef}
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="tag-input"
                />
                <button 
                  onClick={handleAddTag}
                  className="add-tag-btn"
                  disabled={!newTag.trim()}
                >
                  Add
                </button>
              </div>
              
              <div className="tags-list">
                {tags.map(tag => (
                  <div key={tag} className="tag-item">
                    <span className="tag-text">{tag}</span>
                    <button 
                      onClick={() => handleRemoveTag(tag)}
                      className="remove-tag-btn"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="write-sidebar-section">
            <h3 className="write-sidebar-title">Writing Tips</h3>
            <ul className="write-tips-list">
              <li>Start with a compelling headline</li>
              <li>Use clear, concise language</li>
              <li>Break up text with subheadings</li>
              <li>Include relevant images</li>
              <li>End with a strong conclusion</li>
            </ul>
          </div>

          <div className="write-sidebar-section">
            <h3 className="write-sidebar-title">Status</h3>
            <div className="write-status">
              {lastSaved && (
                <p className="last-saved">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </p>
              )}
              {isSaving && (
                <p className="saving-status">Auto-saving...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 