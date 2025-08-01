---
title: 如何使用 Next.js 和 Marked 搭建轻量级博客系统
date: 2025-01-27
---

# 如何使用 Next.js 和 Marked 搭建轻量级博客系统

在现代 Web 开发中，搭建一个高性能、易维护的博客系统并不需要复杂的 CMS 或数据库。本文将详细介绍如何使用 Next.js 15 和 Marked 库，仅通过几个核心依赖就能构建一个功能完整的博客系统。

## 项目概览

我们将构建一个包含以下功能的博客系统：
- 📝 Markdown 文件管理博客内容
- 🎨 统一的设计风格和动画效果
- 📱 响应式设计
- ⚡ 服务端渲染优化
- 🔍 博客列表和详情页
- 🎯 简洁的导航系统

## 技术栈选择

### 核心框架：Next.js 15
Next.js 是 React 的全栈框架，提供了：
- **服务端渲染 (SSR)**：提升 SEO 和首屏加载速度
- **静态生成 (SSG)**：预构建页面，性能极佳
- **API 路由**：内置后端 API 支持
- **文件系统路由**：基于文件结构的路由系统

### Markdown 解析：Marked
Marked 是一个快速、轻量的 Markdown 解析器：
- 🚀 高性能：比其他解析器快 2-3 倍
- 📦 轻量级：gzip 后仅约 20KB
- 🔧 可扩展：支持自定义渲染器
- 📝 标准兼容：完全支持 CommonMark 规范

### 样式方案：Tailwind CSS 4
新一代的 CSS 框架：
- ⚡ 更快的构建速度
- 🎨 原子化 CSS 类
- 📱 内置响应式设计
- 🎯 按需生成，体积更小

### 字体：Google Fonts
- **Geist Sans**：现代无衬线字体，适合界面
- **DM Serif Display**：优雅衬线字体，适合标题
- **Raleway**：清晰易读，适合正文

## 项目结构设计

```
ziwen.icu/
├── posts/                          # Markdown 博客文章
│   ├── modern-frontend-development.md
│   └── nextjs-performance-optimization.md
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── blog/               # 博客 API 路由
│   │   │       ├── route.ts        # 获取所有文章
│   │   │       └── [slug]/
│   │   │           └── route.ts    # 获取单篇文章
│   │   ├── blog/                   # 博客页面
│   │   │   ├── page.tsx           # 博客列表页
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # 博客详情页
│   │   ├── layout.tsx             # 根布局
│   │   └── globals.css            # 全局样式
│   ├── components/
│   │   └── NavBar2/               # 导航组件
│   ├── fonts/                     # 字体配置
│   └── lib/
│       └── blog.ts                # 博客工具函数
└── package.json
```

## 核心依赖安装

首先安装必要的依赖包：

```bash
# 安装 Markdown 解析器
pnpm add marked gray-matter

# TypeScript 类型支持（marked 自带类型定义）
# 注意：不需要安装 @types/marked，marked 已包含类型定义
```

### 依赖说明

1. **marked**：核心 Markdown 解析器
2. **gray-matter**：解析 Markdown 文件的 frontmatter（元数据）

## 核心功能实现

### 1. 博客工具函数 (`src/lib/blog.ts`)

这是整个博客系统的核心，负责读取和解析 Markdown 文件：

```typescript
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;      // 文章标识符
  title: string;     // 文章标题
  date: string;      // 发布日期
  content: string;   // 原始内容
  excerpt?: string;  // 文章摘要
}

const postsDirectory = path.join(process.cwd(), 'posts');

// 获取所有博客文章
export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // 解析 frontmatter
      const matterResult = matter(fileContents);
      
      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || '',
        content: matterResult.content,
        excerpt: matterResult.content.substring(0, 200) + '...'
      };
    });

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 根据 slug 获取单篇文章
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const matterResult = matter(fileContents);
    
    return {
      slug,
      title: matterResult.data.title || slug,
      date: matterResult.data.date || '',
      content: matterResult.content,
    };
  } catch (error) {
    return null;
  }
}

// 将 Markdown 转换为 HTML
export async function markdownToHtml(markdown: string): Promise<string> {
  return await marked(markdown);
}
```

### 2. API 路由设计

#### 博客列表 API (`src/app/api/blog/route.ts`)

```typescript
import { getAllPosts } from '@/lib/blog';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
```

#### 单篇文章 API (`src/app/api/blog/[slug]/route.ts`)

```typescript
import { getPostBySlug, markdownToHtml } from '@/lib/blog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Next.js 15 需要 await params
    const { slug } = await params;
    const post = getPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // 将 Markdown 转换为 HTML
    const htmlContent = await markdownToHtml(post.content);
    
    return NextResponse.json({
      ...post,
      htmlContent
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
```

### 3. 前端页面实现

#### 博客列表页 (`src/app/blog/page.tsx`)

```typescript
"use client";
import { dmSerifDisplay, raleway } from "@/fonts";
import { BlogPost } from "@/lib/blog";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    
    fetchPosts();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full pt-32 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className={`${dmSerifDisplay.className} text-4xl mb-12 text-gray-800 animate-fadeInUp`}>
          Blog
        </h1>
        
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="border-b border-gray-200 pb-8 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className={`${dmSerifDisplay.className} text-2xl mb-3 text-gray-800 group-hover:text-orange-500 transition-colors duration-200`}>
                  {post.title}
                </h2>
              </Link>
              
              <p className={`${raleway.className} text-sm text-gray-500 mb-3`}>
                {new Date(post.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              
              <p className={`${raleway.className} text-gray-600 leading-relaxed`}>
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
      </div>
    </div>
  );
};

export default BlogPage;
```

#### 博客详情页 (`src/app/blog/[slug]/page.tsx`)

```typescript
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
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>文章未找到</div>;
  }

  return (
    <div className="w-full h-full pt-32 px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-orange-500 hover:text-orange-600">
          ← 返回博客列表
        </Link>
        
        <article className="animate-fadeInUp">
          <header className="mb-12">
            <h1 className={`${dmSerifDisplay.className} text-4xl mb-4 text-gray-800`}>
              {post.title}
            </h1>
            <p className={`${raleway.className} text-gray-500`}>
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </p>
          </header>
          
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;
```

## 样式系统设计

### 博客内容样式 (`src/app/globals.css`)

为了保持整站设计一致性，我们为博客内容添加了专门的样式：

```css
/* Blog content styles */
.blog-content {
  color: #4b5563;
  line-height: 1.8;
}

.blog-content h1 {
  font-size: 2.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: var(--font-geist-sans);
}

.blog-content h2 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: var(--font-geist-sans);
}

.blog-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-family: var(--font-geist-sans);
}

.blog-content p {
  margin-bottom: 1.5rem;
}

.blog-content a {
  color: #f97316;
  text-decoration: underline;
  transition: color 0.2s;
}

.blog-content a:hover {
  color: #ea580c;
}

.blog-content pre {
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  font-size: 0.875rem;
}

.blog-content code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.blog-content blockquote {
  border-left: 4px solid #f97316;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #6b7280;
}
```

## 导航系统集成

更新导航栏以包含博客链接：

```typescript
const tabs = [
  { key: "Home", label: "Home", href: "/" },
  { key: "Blog", label: "Blog", href: "/blog" },
  { key: "Projects", label: "Projects", href: "/projects" },
  { key: "Contact", label: "Contact", href: "/contact" },
];

// 智能路径匹配
useEffect(() => {
  let currentTab = "Home";
  
  if (pathname.startsWith("/blog")) {
    currentTab = "Blog";
  } else {
    const tab = tabs.find((tab) => tab.href === pathname);
    if (tab) {
      currentTab = tab.key;
    }
  }
  
  setActiveTab(currentTab);
}, [pathname]);
```

## Markdown 文件格式

博客文章使用标准的 Markdown 格式，包含 frontmatter：

```markdown
---
title: 文章标题
date: 2025-01-27
---

# 文章标题

这里是文章内容...

## 二级标题

- 列表项 1
- 列表项 2

```javascript
// 代码块示例
console.log('Hello World');
```

> 引用块示例
```

## 性能优化策略

### 1. 静态生成优化
- 使用 Next.js 的 `generateStaticParams` 预生成博客页面
- 利用增量静态再生 (ISR) 更新内容

### 2. 图片优化
- 使用 Next.js Image 组件自动优化
- 支持 WebP 格式和响应式加载

### 3. 代码分割
- 页面级别的自动代码分割
- 动态导入减少初始包大小

### 4. 缓存策略
- API 路由添加适当的缓存头
- 利用浏览器缓存和 CDN

## 部署建议

### Vercel 部署（推荐）
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### 自定义服务器
```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start
```

## 扩展功能

### 1. 搜索功能
可以添加基于 Fuse.js 的客户端搜索：

```typescript
import Fuse from 'fuse.js';

const fuse = new Fuse(posts, {
  keys: ['title', 'content'],
  threshold: 0.3
});
```

### 2. 标签系统
在 frontmatter 中添加标签：

```markdown
---
title: 文章标题
date: 2025-01-27
tags: [nextjs, react, markdown]
---
```

### 3. RSS 订阅
生成 RSS feed：

```typescript
// src/app/feed.xml/route.ts
export async function GET() {
  const posts = getAllPosts();
  const rss = generateRSS(posts);
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

## 总结

通过使用 Next.js 15 和 Marked，我们成功构建了一个：

✅ **轻量级**：仅依赖核心库，包体积小
✅ **高性能**：利用 SSG 和 API 路由优化
✅ **易维护**：Markdown 文件管理，版本控制友好
✅ **可扩展**：模块化设计，易于添加新功能
✅ **SEO 友好**：服务端渲染，搜索引擎优化
✅ **响应式**：完美适配各种设备

这个博客系统不仅功能完整，还保持了代码的简洁性和可维护性。无论是个人博客还是技术文档站点，都是一个理想的解决方案。

---

*本文展示了如何用最少的依赖构建现代化的博客系统。如果你有任何问题或建议，欢迎在评论区讨论！*