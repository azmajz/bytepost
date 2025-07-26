import React from 'react';
import { APP_URL } from '@/config/app';
import './about.css';

export const metadata = {
  title: 'About BytePost | Tech Blog, Developer Tutorials, Coding Tips',
  description: 'Learn about BytePost, the #1 tech blog for programming articles, developer tutorials, coding tips, and tech news. BytePost is your go-to source for software development and web development insights.',
  keywords: 'BytePost, tech blog, programming articles, developer tutorials, coding tips, tech news, software development, web development, programming tutorials, best tech blog, top coding blog',
  robots: 'index, follow',
  alternates: {
    canonical: `${APP_URL}/about`,
    languages: {
      'x-default': `${APP_URL}/about`,
      'en': `${APP_URL}/about`,
    },
  },
  openGraph: {
    title: 'About BytePost | Tech Blog, Developer Tutorials, Coding Tips',
    description: 'Discover why BytePost is the leading tech blog for developers and coders. Explore programming tutorials, coding tips, and the latest in software and web development.',
    type: 'website',
    url: `${APP_URL}/about`,
    siteName: 'BytePost',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About BytePost | Tech Blog, Developer Tutorials, Coding Tips',
    description: 'Discover why BytePost is the leading tech blog for developers and coders. Explore programming tutorials, coding tips, and the latest in software and web development.',
    site: '@bytepost',
    creator: '@bytepost',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
  },
  other: {
    'X-UA-Compatible': 'IE=edge',
  },
};

export default function AboutPage() {
  return (
    <section className="about-page">
      <h1>About BytePost</h1>
      <p><strong>BytePost</strong> is the premier tech blog for developers, programmers, and technology enthusiasts. BytePost is dedicated to delivering concise, insightful, and practical content that empowers coders to stay ahead in the fast-paced world of software and web development.</p>
      <h2>Why BytePost?</h2>
      <ul>
        <li><strong>Top Tech Blog:</strong> BytePost consistently provides top tech blog, programming articles, and developer tutorials.</li>
        <li><strong>Expert Insights:</strong> Our articles are crafted by experienced developers, ensuring accuracy and real-world value.</li>
        <li><strong>Comprehensive Coverage:</strong> From coding tips and programming tutorials to tech news and software development trends, BytePost covers it all.</li>
        <li><strong>Community Driven:</strong> Join a vibrant community of coders, share your knowledge, and grow your skills with BytePost.</li>
      </ul>
      <h2>What You’ll Find on BytePost</h2>
      <ul>
        <li>In-depth programming tutorials and guides</li>
        <li>Latest tech news and trends</li>
        <li>Actionable coding tips and best practices</li>
        <li>Software and web development resources</li>
        <li>Community discussions and expert Q&A</li>
      </ul>
      <h2>Get in Touch</h2>
      <p>Want to contribute, collaborate, or have questions? Contact us at <a href="mailto:contact@bytepost.com">contact@bytepost.com</a> or follow us on Twitter <a href="https://twitter.com/bytepost" target="_blank" rel="noopener">@bytepost</a>.</p>
      <p>Thank you for making BytePost your trusted source for tech knowledge. Together, let’s code the future!</p>
    </section>
  );
} 