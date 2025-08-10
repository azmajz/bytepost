import { supabase } from './supabase';

const defaultTopics = [
  { name: 'Technology', slug: 'technology', description: 'Posts about technology trends and innovations' },
  { name: 'Programming', slug: 'programming', description: 'Programming tutorials and tips' },
  { name: 'Web Development', slug: 'web-development', description: 'Web development guides and resources' },
  { name: 'Design', slug: 'design', description: 'Design principles and best practices' },
  { name: 'Business', slug: 'business', description: 'Business insights and strategies' },
  { name: 'Productivity', slug: 'productivity', description: 'Productivity tips and tools' },
  { name: 'Tutorial', slug: 'tutorial', description: 'Step-by-step tutorials and guides' },
  { name: 'Opinion', slug: 'opinion', description: 'Personal opinions and perspectives' },
  { name: 'News', slug: 'news', description: 'Latest news and updates' },
  { name: 'Review', slug: 'review', description: 'Product and service reviews' }
];

const defaultTags = [
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'React', slug: 'react' },
  { name: 'Node.js', slug: 'nodejs' },
  { name: 'Python', slug: 'python' },
  { name: 'CSS', slug: 'css' },
  { name: 'HTML', slug: 'html' },
  { name: 'Database', slug: 'database' },
  { name: 'API', slug: 'api' },
  { name: 'Security', slug: 'security' },
  { name: 'Performance', slug: 'performance' }
];

export const seedDefaultTopics = async () => {
  try {
    for (const topic of defaultTopics) {
      const { error } = await supabase
        .from('topics')
        .upsert(topic, { onConflict: 'name' });
      
      if (error) {
        console.error(`Error seeding topic ${topic.name}:`, error);
      }
    }
    console.log('Default topics seeded successfully');
  } catch (error) {
    console.error('Error seeding default topics:', error);
  }
};

export const seedDefaultTags = async () => {
  try {
    for (const tag of defaultTags) {
      const { error } = await supabase
        .from('tags')
        .upsert(tag, { onConflict: 'name' });
      
      if (error) {
        console.error(`Error seeding tag ${tag.name}:`, error);
      }
    }
    console.log('Default tags seeded successfully');
  } catch (error) {
    console.error('Error seeding default tags:', error);
  }
};

export const seedAllData = async () => {
  await seedDefaultTopics();
  await seedDefaultTags();
};
