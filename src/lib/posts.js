import { supabase } from './supabase'

export async function getPublishedPosts() {
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
      console.error('Error fetching posts:', postsError)
      return []
    }

    return posts || []
  } catch (error) {
    console.error('Error in getPublishedPosts:', error)
    return []
  }
}

export async function getPostBySlug(slug) {
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
      console.error('Error fetching post:', postError)
      return null
    }

    return post
  } catch (error) {
    console.error('Error in getPostBySlug:', error)
    return null
  }
} 