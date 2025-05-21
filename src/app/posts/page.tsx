"use client";
import { dmSerifDisplay } from "@/fonts";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.5 },
  }),
};

// 博客卡片组件
const PostCard = (post: Post) => {
  return (
    <motion.div
      className="cursor-pointer mt-24 text-center"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={post.url} className="block">
        {/* 标题 */}
        <h2 className={`${dmSerifDisplay.className} text-3xl font-bold mb-2`}>
          {post.title}
        </h2>
        {/* 日期 */}
        <time dateTime={post.date} className="block text-xs text-gray-500 mb-3">
          {format(parseISO(post.date), "yyyy年MM月dd日")}
        </time>
      </Link>
    </motion.div>
  );
};

const BlogList = () => {
  const posts = allPosts.sort((a: Post, b: Post) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex">
      <div className="mx-auto max-w-2xl">
        {posts.map((post: Post, idx: number) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
