export const getLayoutMetadata = (appUrl) => {
    return {
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

} 