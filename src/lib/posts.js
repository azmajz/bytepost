import { supabase } from './supabase'
import { cache } from 'react'

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