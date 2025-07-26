import '@/app/globals.css'
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { getLayoutMetadata, getStructuredData } from '@/data/metadata';
import { toastOptions } from '@/config/toast';
import { APP_URL } from '@/config/app';

export const metadata = getLayoutMetadata(APP_URL)
const structuredData = JSON.stringify(getStructuredData(APP_URL))

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="a5CrsXb9_5wqCm6ou6T-koFUmnEZsoKBASMgS8PnPdk" />
        {/* Favicon */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: structuredData
          }}
        />
      </head>
      <body className="light-theme">
        <ThemeProvider>
          <Toaster
            position="top-right"
            toastOptions={toastOptions}
            theme={typeof window !== 'undefined' && document.body.classList.contains('dark-theme') ? 'dark' : 'light'}
          />
          <main className='layout-main'>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
