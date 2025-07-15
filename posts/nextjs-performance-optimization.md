---
title: Next.js 性能优化实践指南
date: 2025-01-26
---

# Next.js 性能优化实践指南

Next.js 作为一个全栈 React 框架，提供了许多开箱即用的性能优化功能。本文将深入探讨如何在 Next.js 应用中实现最佳性能。

## 图片优化

### 使用 Next.js Image 组件

Next.js 的 `Image` 组件提供了自动优化功能：

```jsx
import Image from 'next/image';

function Hero() {
  return (
    <div className="hero">
      <Image
        src="/hero-image.jpg"
        alt="Hero image"
        width={800}
        height={600}
        priority // 关键图片使用 priority
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      />
    </div>
  );
}
```

### 关键特性

- **自动格式选择**：根据浏览器支持自动选择 WebP、AVIF 等格式
- **响应式图片**：自动生成不同尺寸的图片
- **懒加载**：默认启用懒加载，提高首屏性能
- **占位符**：支持模糊占位符，改善用户体验

## 代码分割与懒加载

### 动态导入

使用 `dynamic` 函数实现组件级别的代码分割：

```jsx
import dynamic from 'next/dynamic';

// 懒加载组件
const DynamicComponent = dynamic(
  () => import('../components/HeavyComponent'),
  {
    loading: () => <div>Loading...</div>,
    ssr: false // 禁用服务端渲染
  }
);

// 条件加载
const ConditionalComponent = dynamic(
  () => import('../components/ConditionalComponent'),
  {
    loading: () => <div>Loading...</div>
  }
);

function MyPage() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <h1>My Page</h1>
      {showComponent && <ConditionalComponent />}
      <button onClick={() => setShowComponent(true)}>
        Load Component
      </button>
    </div>
  );
}
```

### 路由级别的代码分割

Next.js 自动为每个页面创建单独的 bundle：

```
pages/
├── index.js          → /
├── about.js          → /about
├── blog/
│   ├── index.js      → /blog
│   └── [slug].js     → /blog/[slug]
└── api/
    └── users.js      → /api/users
```

## 字体优化

### 使用 next/font

```jsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
```

### 自定义字体

```jsx
import localFont from 'next/font/local';

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
```

## 缓存策略

### 静态生成 (SSG)

```jsx
// 构建时生成静态页面
export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: {
      posts,
    },
    revalidate: 60, // ISR: 60秒后重新生成
  };
}

// 动态路由的静态生成
export async function getStaticPaths() {
  const posts = await fetchPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // 或 true/false
  };
}
```

### 服务端渲染 (SSR)

```jsx
// 每次请求时在服务端渲染
export async function getServerSideProps(context) {
  const { req, res, query } = context;
  
  // 设置缓存头
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  
  const data = await fetchData(query.id);
  
  return {
    props: {
      data,
    },
  };
}
```

## 性能监控

### Web Vitals

```jsx
// pages/_app.js
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'CLS':
      // 累积布局偏移
      console.log('CLS:', metric.value);
      break;
    case 'FID':
      // 首次输入延迟
      console.log('FID:', metric.value);
      break;
    case 'FCP':
      // 首次内容绘制
      console.log('FCP:', metric.value);
      break;
    case 'LCP':
      // 最大内容绘制
      console.log('LCP:', metric.value);
      break;
    case 'TTFB':
      // 首字节时间
      console.log('TTFB:', metric.value);
      break;
  }
}
```

### 性能分析

使用 Next.js 内置的性能分析工具：

```bash
# 分析 bundle 大小
npm run build -- --analyze

# 开发环境性能分析
npm run dev -- --profile
```

## 优化配置

### next.config.js 配置

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 实验性功能
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  
  // 图片配置
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 压缩配置
  compress: true,
  
  // 重定向
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
  
  // 头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  // Webpack 配置
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 自定义 webpack 配置
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    
    return config;
  },
};

module.exports = nextConfig;
```

## 最佳实践清单

### ✅ 性能优化检查清单

1. **图片优化**
   - [ ] 使用 Next.js Image 组件
   - [ ] 为关键图片添加 `priority` 属性
   - [ ] 使用适当的图片格式（WebP、AVIF）
   - [ ] 设置合理的图片尺寸

2. **代码分割**
   - [ ] 使用动态导入拆分大型组件
   - [ ] 避免在首屏加载不必要的代码
   - [ ] 合理使用 `dynamic` 函数

3. **缓存策略**
   - [ ] 选择合适的渲染策略（SSG、SSR、CSR）
   - [ ] 使用 ISR 实现增量静态再生成
   - [ ] 设置合理的缓存头

4. **字体优化**
   - [ ] 使用 `next/font` 优化字体加载
   - [ ] 设置 `font-display: swap`
   - [ ] 预加载关键字体

5. **性能监控**
   - [ ] 监控 Web Vitals 指标
   - [ ] 使用 Lighthouse 进行性能测试
   - [ ] 定期分析 bundle 大小

### ⚠️ 常见陷阱

> **注意**：避免在 `getServerSideProps` 中进行大量计算，这会增加服务器响应时间。

```jsx
// ❌ 错误做法
export async function getServerSideProps() {
  const heavyComputation = await performHeavyTask(); // 阻塞渲染
  return { props: { data: heavyComputation } };
}

// ✅ 正确做法
export async function getServerSideProps() {
  const lightData = await fetchLightData();
  return { props: { data: lightData } };
}

// 在客户端进行重计算
function MyComponent({ data }) {
  const [processedData, setProcessedData] = useState(null);
  
  useEffect(() => {
    processData(data).then(setProcessedData);
  }, [data]);
  
  return <div>{processedData ? <Result data={processedData} /> : <Loading />}</div>;
}
```

## 总结

Next.js 提供了丰富的性能优化工具和策略。关键是要：

1. **选择合适的渲染策略**：根据数据更新频率选择 SSG、SSR 或 CSR
2. **优化资源加载**：使用 Image 组件、字体优化、代码分割
3. **监控性能指标**：持续监控 Web Vitals 和用户体验
4. **渐进式优化**：先解决最影响用户体验的问题

记住，性能优化是一个持续的过程，需要根据实际使用情况不断调整和改进。

---

*更多 Next.js 性能优化技巧，请关注我的后续文章！* 