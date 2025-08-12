"use client";
import { dmSerifDisplay, raleway } from "@/fonts";
import { BlogPost } from "@/lib/blog";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 在客户端获取博客文章
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts().finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full h-full pt-32 px-8">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="space-y-8 animate-pulse">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-8">
                <div className="h-7 bg-gray-200 rounded w-2/3 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-6" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="border-b border-gray-200 pb-8 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2
                    className={`${dmSerifDisplay.className} text-2xl mb-3 text-gray-800 group-hover:text-orange-500 transition-colors duration-200`}
                  >
                    {post.title}
                  </h2>
                </Link>

                <p
                  className={`${raleway.className} text-sm text-gray-500 mb-3`}
                >
                  {new Date(post.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <p
                  className={`${raleway.className} text-gray-600 leading-relaxed`}
                >
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className={`${raleway.className} inline-block mt-4 text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200`}
                >
                  阅读更多 →
                </Link>
              </article>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className={`${raleway.className} text-gray-500`}>暂无博客文章</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
