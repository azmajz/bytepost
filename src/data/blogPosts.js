export const blogPosts = [
  {
    slug: 'getting-started-with-nextjs-13',
    title: 'Getting Started with Next.js 13: A Complete Guide for Developers',
    excerpt: 'Learn how to build modern web applications with Next.js 13, including the new App Router, Server Components, and improved performance features.',
    content: `
      <p>Next.js 13 represents a significant evolution in the React framework, introducing groundbreaking features that redefine how we build web applications. In this comprehensive guide, we'll explore everything you need to know to get started with Next.js 13.</p>
      
      <h2>The App Router: A New Paradigm</h2>
      <p>The most notable change in Next.js 13 is the introduction of the App Router. This new routing system is built on React Server Components and provides a more intuitive way to organize your application structure.</p>
      
      <p>Unlike the traditional Pages Router, the App Router uses a file-system based approach where folders define routes, and special files like <code>page.js</code>, <code>layout.js</code>, and <code>loading.js</code> define the UI for those routes.</p>
      
      <h2>Server Components by Default</h2>
      <p>Next.js 13 makes React Server Components the default, which means your components are rendered on the server by default. This provides several benefits:</p>
      
      <ul>
        <li><strong>Better Performance:</strong> Server components reduce the JavaScript bundle size sent to the client</li>
        <li><strong>Improved SEO:</strong> Content is rendered on the server, making it immediately available to search engines</li>
        <li><strong>Enhanced Security:</strong> Sensitive data and logic can be kept on the server</li>
        <li><strong>Faster Initial Page Load:</strong> Users see content faster as it's pre-rendered</li>
      </ul>
      
      <h2>Setting Up Your First Next.js 13 Project</h2>
      <p>Getting started with Next.js 13 is straightforward. Here's how to create your first project:</p>
      
      <pre><code>npx create-next-app@latest my-nextjs-app --typescript --tailwind --eslint</code></pre>
      
      <p>This command will create a new Next.js 13 project with TypeScript, Tailwind CSS, and ESLint configured out of the box.</p>
      
      <h2>Understanding the Project Structure</h2>
      <p>With the App Router, your project structure will look like this:</p>
      
      <pre><code>my-nextjs-app/
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── favicon.ico
├── public/
├── package.json
└── next.config.js</code></pre>
      
      <h2>Creating Your First Page</h2>
      <p>In the App Router, pages are created using the <code>page.js</code> file. Here's a simple example:</p>
      
      <pre><code>// app/page.js
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js 13!</h1>
      <p>This is my first page using the App Router.</p>
    </div>
  )
}</code></pre>
      
      <h2>Working with Layouts</h2>
      <p>Layouts in Next.js 13 allow you to create shared UI that wraps multiple pages. They're defined using the <code>layout.js</code> file:</p>
      
      <pre><code>// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>My Next.js App</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024 My App</p>
        </footer>
      </body>
    </html>
  )
}</code></pre>
      
      <h2>Data Fetching in Next.js 13</h2>
      <p>Next.js 13 introduces new patterns for data fetching that work seamlessly with Server Components:</p>
      
      <pre><code>// app/posts/page.js
async function getPosts() {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}</code></pre>
      
      <h2>Performance Optimizations</h2>
      <p>Next.js 13 includes several performance improvements:</p>
      
      <ul>
        <li><strong>Turbopack:</strong> A new bundler that's up to 700x faster than Webpack</li>
        <li><strong>Improved Image Component:</strong> Better performance and optimization for images</li>
        <li><strong>Streaming:</strong> Progressive rendering of pages for better perceived performance</li>
        <li><strong>Partial Prerendering:</strong> Combines static and dynamic content for optimal performance</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Next.js 13 represents a significant step forward in the React ecosystem. With its new App Router, Server Components, and performance improvements, it provides developers with powerful tools to build modern, fast, and scalable web applications.</p>
      
      <p>As you continue your journey with Next.js 13, remember to explore the official documentation and experiment with the new features. The framework is designed to be intuitive and powerful, making it easier than ever to build exceptional web experiences.</p>
    `,
    image: '/blog-1.png',
    topic: 'Web Development',
    author: {
      name: 'Julia Walker',
      avatar: '/author.png',
      bio: 'Senior Frontend Developer with 8+ years of experience in React, Next.js, and modern web technologies. Passionate about creating performant and accessible web applications.',
      twitter: 'juliawalker',
      github: 'juliawalker'
    },
    date: 'January 17, 2024',
    readTime: '8 min read',
    tags: ['Next.js', 'React', 'Web Development', 'JavaScript'],
    views: 1247,
    likes: 89
  },
  {
    slug: 'mastering-react-hooks',
    title: 'Mastering React Hooks: A Deep Dive into State Management',
    excerpt: 'Explore the power of React Hooks and learn how to build more efficient and maintainable React applications with modern state management patterns.',
    content: `
      <p>React Hooks have revolutionized how we write React components, making functional components more powerful and easier to understand. In this comprehensive guide, we'll explore the most important hooks and how to use them effectively.</p>
      
      <h2>Understanding the useState Hook</h2>
      <p>The useState hook is the foundation of state management in functional components. It allows you to add state to your components without converting them to class components.</p>
      
      <pre><code>import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}</code></pre>
      
      <h2>The useEffect Hook</h2>
      <p>useEffect is essential for handling side effects in functional components. It replaces componentDidMount, componentDidUpdate, and componentWillUnmount from class components.</p>
      
      <pre><code>import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]); // Dependency array
    
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
    
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}</code></pre>
      
      <h2>Custom Hooks</h2>
      <p>Custom hooks allow you to extract component logic into reusable functions. This is one of the most powerful features of React Hooks.</p>
      
      <pre><code>// useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
    />
  );
}</code></pre>
      
      <h2>useContext for Global State</h2>
      <p>useContext provides a way to pass data through the component tree without having to pass props down manually at every level.</p>
      
      <pre><code>// ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}</code></pre>
      
      <h2>useReducer for Complex State</h2>
      <p>useReducer is perfect for managing complex state logic that involves multiple sub-values or when the next state depends on the previous one.</p>
      
      <pre><code>import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}</code></pre>
      
      <h2>Best Practices</h2>
      <p>When working with hooks, follow these best practices:</p>
      
      <ul>
        <li><strong>Always call hooks at the top level:</strong> Don't call hooks inside loops, conditions, or nested functions</li>
        <li><strong>Only call hooks from React functions:</strong> Call hooks from React function components or custom hooks</li>
        <li><strong>Use the dependency array correctly:</strong> Include all values from the component scope that change over time</li>
        <li><strong>Extract complex logic into custom hooks:</strong> This improves reusability and testability</li>
        <li><strong>Use multiple useEffect calls:</strong> Separate concerns by using multiple useEffect hooks</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>React Hooks have fundamentally changed how we write React applications. They provide a more intuitive way to manage state and side effects while making our code more readable and maintainable.</p>
      
      <p>By mastering hooks like useState, useEffect, useContext, and useReducer, you'll be able to build more powerful and efficient React applications. Remember to follow the rules of hooks and leverage custom hooks to create reusable logic.</p>
    `,
    image: '/blog-2.png',
    topic: 'React',
    author: {
      name: 'Julia Walker',
      avatar: '/author.png',
      bio: 'Senior Frontend Developer with 8+ years of experience in React, Next.js, and modern web technologies. Passionate about creating performant and accessible web applications.',
      twitter: 'juliawalker',
      github: 'juliawalker'
    },
    date: 'January 15, 2024',
    readTime: '12 min read',
    tags: ['React', 'JavaScript', 'Hooks', 'State Management'],
    views: 2156,
    likes: 156
  },
  {
    slug: 'css-grid-vs-flexbox',
    title: 'CSS Grid vs Flexbox: When to Use Each Layout System',
    excerpt: 'Understanding the differences between CSS Grid and Flexbox, and learning when to use each layout system for optimal web design.',
    content: `
      <p>CSS Grid and Flexbox are two powerful layout systems in CSS, each with their own strengths and use cases. Understanding when to use each can significantly improve your web design workflow.</p>
      
      <h2>CSS Flexbox Overview</h2>
      <p>Flexbox is designed for one-dimensional layouts - either a row or a column. It's perfect for distributing space along a single axis and aligning items within a container.</p>
      
      <pre><code>.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1;
  margin: 10px;
}</code></pre>
      
      <h2>CSS Grid Overview</h2>
      <p>CSS Grid is designed for two-dimensional layouts - both rows and columns. It's ideal for creating complex layouts with precise control over both axes.</p>
      
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
}</code></pre>
      
      <h2>When to Use Flexbox</h2>
      <p>Use Flexbox when you need:</p>
      
      <ul>
        <li><strong>Navigation menus:</strong> Horizontal or vertical navigation with flexible spacing</li>
        <li><strong>Card layouts:</strong> Items that need to be distributed evenly</li>
        <li><strong>Form layouts:</strong> Aligning form elements and labels</li>
        <li><strong>Centering content:</strong> Both horizontally and vertically</li>
        <li><strong>Responsive design:</strong> Items that need to wrap to new lines</li>
      </ul>
      
      <h2>When to Use CSS Grid</h2>
      <p>Use CSS Grid when you need:</p>
      
      <ul>
        <li><strong>Page layouts:</strong> Overall page structure with header, sidebar, main content, and footer</li>
        <li><strong>Photo galleries:</strong> Complex arrangements of images</li>
        <li><strong>Dashboard layouts:</strong> Multiple widgets arranged in a grid</li>
        <li><strong>Responsive grids:</strong> Items that need to maintain their grid structure</li>
        <li><strong>Complex layouts:</strong> When you need precise control over both dimensions</li>
      </ul>
      
      <h2>Combining Both Systems</h2>
      <p>The real power comes from combining both systems. You can use Grid for the overall page layout and Flexbox for the components within each grid area.</p>
      
      <pre><code>.page-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.sidebar {
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main {
  grid-area: main;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}</code></pre>
      
      <h2>Responsive Design Considerations</h2>
      <p>Both systems handle responsive design differently:</p>
      
      <h3>Flexbox Responsive Design</h3>
      <pre><code>.responsive-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 300px; /* grow, shrink, basis */
}

@media (max-width: 768px) {
  .flex-item {
    flex: 1 1 100%;
  }
}</code></pre>
      
      <h3>Grid Responsive Design</h3>
      <pre><code>.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

@media (max-width: 768px) {
  .responsive-grid {
    grid-template-columns: 1fr;
  }
}</code></pre>
      
      <h2>Performance Considerations</h2>
      <p>Both layout systems are well-optimized in modern browsers, but there are some considerations:</p>
      
      <ul>
        <li><strong>Flexbox:</strong> Generally performs better for simple layouts and animations</li>
        <li><strong>CSS Grid:</strong> May have slightly higher overhead for complex layouts but provides more control</li>
        <li><strong>Browser support:</strong> Both have excellent modern browser support</li>
        <li><strong>Learning curve:</strong> Flexbox is typically easier to learn initially</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Follow these best practices when choosing between Grid and Flexbox:</p>
      
      <ol>
        <li><strong>Start with the content:</strong> Let your content structure guide your choice</li>
        <li><strong>Use Flexbox for components:</strong> Individual components often work better with Flexbox</li>
        <li><strong>Use Grid for layouts:</strong> Overall page layouts benefit from Grid's two-dimensional control</li>
        <li><strong>Don't be afraid to combine:</strong> Use both systems together for the best results</li>
        <li><strong>Test on different screen sizes:</strong> Ensure your layouts work across all devices</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>CSS Grid and Flexbox are complementary layout systems, each excelling in different scenarios. Flexbox is perfect for one-dimensional layouts and component-level styling, while CSS Grid is ideal for two-dimensional layouts and overall page structure.</p>
      
      <p>The key is understanding the strengths of each system and choosing the right tool for the job. Often, the best approach is to use both together - Grid for the overall layout and Flexbox for the components within each grid area.</p>
    `,
    image: '/blog-3.png',
    topic: 'CSS',
    author: {
      name: 'Julia Walker',
      avatar: '/author.png',
      bio: 'Senior Frontend Developer with 8+ years of experience in React, Next.js, and modern web technologies. Passionate about creating performant and accessible web applications.',
      twitter: 'juliawalker',
      github: 'juliawalker'
    },
    date: 'January 12, 2024',
    readTime: '10 min read',
    tags: ['CSS', 'Grid', 'Flexbox', 'Web Design'],
    views: 1893,
    likes: 134
  }
];

export function getBlogPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts() {
  return blogPosts;
} 