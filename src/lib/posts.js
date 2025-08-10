import { supabase } from './supabase'
import { cache } from 'react'
import { bucketFolders, uploadImage } from './storage'
import { calculateReadTime, generateExcerpt, generateSlug } from './helper'

export const getPublishedPosts = async () => {
  try {
    // Fetch posts with authors and topics in a single query
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select(`
        *,
        author:authors (
          id,
          username,
          full_name,
          avatar_url
        ),
        topic:topics (
          id,
          name,
          slug
        )
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (postsError) {
      return []
    }

    return posts || []
  } catch (error) {
    console.error('Error in getPublishedPosts:', error)
    return []
  }
}

export const getPostBySlug = cache(async(slug) => {
  try {
    // Fetch post with author and topic in a single query
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        slug,
        cover_image_url,
        read_time,
        view_count,
        like_count,
        created_at,
        author:authors (
          full_name,
          avatar_url
        ),
        topic:topics (
          name,
          icon
        )
      `)
      .eq('slug', slug)
      .single()

    if (postError) {
      return null
    }

    return post
  } catch (error) {
    console.error('Error in getPostBySlug:', error)
    return null
  }
})

export const getPostMetadata = async(slug) => {
    try {
  
      const { data: post, error: postError } = await supabase
        .from('posts')
        .select(`
          title,
          excerpt,
          cover_image_url
        `)
        .eq('slug', slug)
        .single();

      if (postError) {
        return null
      }
  
      return post
    } catch (error) {
      console.error('Error in getPostBySlug:', error)
      return null
    }
  }

export const searchPosts = async (query) => {
  try {
    if (!query || query.trim() === '') {
      return []
    }

    const searchQuery = query.trim().toLowerCase()

    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:authors (
          id,
          username,
          full_name,
          avatar_url
        ),
        topic:topics (
          id,
          name,
          slug
        ),
        post_tags (
          tag:tags (
            name,
            slug
          )
        )
      `)
      .eq('published', true)
      .or(`title.ilike.%${searchQuery}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching posts:', error)
      return []
    }

    return posts || []
  } catch (error) {
    console.error('Error in searchPosts:', error)
    return []
  }
}

export const getPopularTopics = async () => {
  try {
    const { data: topics, error } = await supabase
      .from('topics')
      .select('name, slug, post_count')
      .order('post_count', { ascending: false })
      .limit(6)

    if (error) {
      console.error('Error fetching popular topics:', error)
      return []
    }

    return topics || []
  } catch (error) {
    console.error('Error in getPopularTopics:', error)
    return []
  }
}

export const getAllTopics = async () => {
  try {
    const { data: topics, error } = await supabase
      .from('topics')
      .select('id, name')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching all topics:', error)
      return []
    }

    return topics || []
  } catch (error) {
    console.error('Error in getAllTopics:', error)
    return []
  }
}

export const createPost = async (postData, userId) => {

  try {
    const {
      title,
      content,
      coverImage,
      selectedTopic,
      tags,
      published = false
    } = postData;

    const slug = generateSlug(title)
    const readTime = calculateReadTime(content)
    const excerpt = generateExcerpt(content)

    // Handle cover image upload if provided
    let coverImageUrl = null;
    console.log('coverImage', coverImage)
    if (coverImage) {
      try {
        coverImageUrl = await uploadImage(coverImage, bucketFolders.POSTS);
      } catch (error) {
        console.log('error', error)
        throw new Error('Failed to upload cover image');
      }
    }

    // Get or create topic
    let topicId = null;
    if (selectedTopic) {
      topicId = await getOrCreateTopic(selectedTopic);
    }

    // Create the post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        slug,
        cover_image_url: coverImageUrl,
        author_id: userId,
        topic_id: topicId,
        published,
        read_time: readTime,
        excerpt,
        view_count: 1,
      })
      .select()
      .single();

    if (postError) {
      throw new Error(postError.message);
    }

    // Handle tags
    if (tags && tags.length > 0) {
      await handlePostTags(post.id, tags);
    }

    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getOrCreateTopic = async (topicName) => {
  try {
    // Check if topic exists
    const { data: existingTopic } = await supabase
      .from('topics')
      .select('id')
      .eq('name', topicName)
      .single();

    if (existingTopic) {
      return existingTopic.id;
    }

    // Create new topic
    const slug = topicName
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const { data: newTopic, error } = await supabase
      .from('topics')
      .insert({
        name: topicName,
        slug,
        post_count: 0,
        description: `Posts about ${topicName}`
      })
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    return newTopic.id;
  } catch (error) {
    console.error('Error handling topic:', error);
    throw error;
  }
};

export const handlePostTags = async (postId, tagNames) => {
  try {
    for (const tagName of tagNames) {
      // Get or create tag
      let tagId = await getOrCreateTag(tagName);

      // Create post-tag relationship
      await supabase
        .from('post_tags')
        .insert({
          post_id: postId,
          tag_id: tagId
        });
    }
  } catch (error) {
    console.error('Error handling tags:', error);
    throw error;
  }
};

export const getOrCreateTag = async (tagName) => {
  try {
    // Check if tag exists
    const { data: existingTag } = await supabase
      .from('tags')
      .select('id')
      .eq('name', tagName)
      .single();

    if (existingTag) {
      return existingTag.id;
    }

    // Create new tag
    const slug = tagName
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const { data: newTag, error } = await supabase
      .from('tags')
      .insert({
        name: tagName,
        slug,
        post_count: 0,
        description: `Posts tagged with ${tagName}`
      })
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    return newTag.id;
  } catch (error) {
    console.error('Error handling tag:', error);
    throw error;
  }
};

export const ensureAuthorExists = async (userId) => {
  try {
    // Check if author exists
    const { data: existingAuthor } = await supabase
      .from('authors')
      .select('id')
      .eq('id', userId)
      .single();

    if (existingAuthor) {
      return existingAuthor.id;
    }

    // Get user data from auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not found');
    }

    // Create author record
    const { data: newAuthor, error } = await supabase
      .from('authors')
      .insert({
        id: userId,
        username: user.email.split('@')[0], // Use email prefix as username
        email: user.email,
        full_name: user.user_metadata?.name || user.email.split('@')[0],
        avatar_url: null,
        bio: null,
        website: null,
        social_links: {}
      })
      .select('id')
      .single();

    if (error) {
      throw error;
    }

    return newAuthor.id;
  } catch (error) {
    console.error('Error ensuring author exists:', error);
    throw error;
  }
};

export const saveDraft = async (postData, userId) => {
  return createPost({ ...postData, published: false }, userId);
};

export const publishPost = async (postData, userId) => {
  return createPost({ ...postData, published: true }, userId);
}; 