"use client";
import { dmSerifDisplay, raleway } from "@/fonts";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BlogPostWithHtml {
  slug: string;
  title: string;
  date: string;
  content: string;
  htmlContent: string;
}

const BlogPostPage = () => {
  const params = useParams();
  const [post, setPost] = useState<BlogPostWithHtml | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="w-full h-full pt-32 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8 w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full h-full pt-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`${dmSerifDisplay.className} text-4xl mb-8 text-gray-800`}
          >
            文章未找到
          </h1>
          <Link
            href="/blog"
            className={`${raleway.className} text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200`}
          >
            ← 返回博客列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full pt-32 px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className={`${raleway.className} text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200 mb-8 inline-block animate-fadeInUp`}
        >
          ← 返回博客列表
        </Link>

        <article
          className="animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <header className="mb-12">
            <h1
              className={`${dmSerifDisplay.className} text-4xl mb-4 text-gray-800`}
            >
              {post.title}
            </h1>
            <p className={`${raleway.className} text-gray-500`}>
              {new Date(post.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          <div
            className={`${raleway.className} prose prose-lg max-w-none blog-content`}
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;
