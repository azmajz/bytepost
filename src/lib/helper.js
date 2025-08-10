const generateHexId = (length = 12) => {
  const byteLength = Math.ceil(length / 2);
  const array = new Uint8Array(byteLength);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').slice(0, length);
}

export const generateSlug = (title) => {
  // Generate base slug from title
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Combine base slug with random suffix
  return `${baseSlug}-${generateHexId()}`;
};
export const generateExcerpt = (content) => {
  // Generate excerpt from content (first 200 characters)
 return content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 200)
    .trim() + '...'; 
};

export const calculateReadTime = (content) => {
  // Calculate read time (rough estimate: 200 words per minute)
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

