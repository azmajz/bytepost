import './globals.css'
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export const metadata = {
    title: "BytePost - Powerful Tech Posts, Streamlined",
    description: "Discover BytePost, your go-to source for concise, insightful tech articles, tutorials, and developer posts. Stay ahead with quick, practical content crafted for coders and tech enthusiasts.",
    keywords: "BytePost, tech blog, programming articles, developer tutorials, coding tips, tech news, software development, web development, programming tutorials",
    robots: "index, follow",
    alternates: {
      canonical: appUrl,
      languages: {
        'x-default': appUrl,
        'en': appUrl,
      },
    },
    openGraph: {
      title: "BytePost - Quick Tech Articles & Dev Posts",
      description: "Discover BytePost, your go-to source for concise, insightful tech articles, tutorials, and developer posts. Stay ahead with quick, practical content crafted for coders and tech enthusiasts.",
      type: "website",
      url: appUrl,
      siteName: "BytePost",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "BytePost - Quick Tech Articles & Dev Posts",
      description: "Discover BytePost, your go-to source for concise, insightful tech articles, tutorials, and developer posts. Stay ahead with quick, practical content crafted for coders and tech enthusiasts.",
      site: "@bytepost",
      creator: "@bytepost",
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/favicon.png",
    },
    other: {
      "X-UA-Compatible": "IE=edge",
    },
  };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Favicon */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        
        {/* Quill Editor */}
        <link href="https://cdn.jsdelivr.net/npm/quill@2/dist/quill.snow.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/quill-table-better@1/dist/quill-table-better.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/quill@2/dist/quill.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/quill-table-better@1/dist/quill-table-better.js"></script>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "BytePost",
              "url": "https://bytepost.web.app",
              "description": "Discover BytePost, your go-to source for concise, insightful tech articles, tutorials, and developer posts.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bytepost.web.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="light-theme">
        <ThemeProvider>
          <Header />
          <main>  
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
