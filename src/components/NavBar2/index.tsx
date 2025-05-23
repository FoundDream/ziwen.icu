"use client";
import { motion } from "motion/react";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const tabs = [
  { key: "Home", label: "Home", href: "/" },
  { key: "Posts", label: "Posts", href: "/posts" },
  { key: "About", label: "About", href: "/about" },
  // { key: "Projects", label: "Projects", href: "/projects" },
  { key: "Contact", label: "Contact", href: "/contact" },
  { key: "Friends", label: "Friends", href: "/friends" },
];

const NavBar2 = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("Home");

  // 根据当前路径更新活动标签
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.href === pathname)?.key || "Home";
    setActiveTab(currentTab);
  }, [pathname]);

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <div key={tab.key} className="relative">
            <Link
              href={tab.href}
              className={`${raleway.className} font-semibold ${
                isActive ? "text-gray-700" : "text-gray-500"
              } hover:text-gray-700 transition-colors duration-200`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </Link>
            {isActive && (
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-orange-500"
                layoutId="underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavBar2;
