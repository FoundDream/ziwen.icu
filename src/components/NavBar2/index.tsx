"use client";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const tabs = [
  { key: "Home", label: "Home", href: "/" },
  { key: "Blog", label: "Blog", href: "/blog" },
  { key: "Projects", label: "Projects", href: "/projects" },
  { key: "Contact", label: "Contact", href: "/contact" },
];

const NavBar2 = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("Home");
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({});

  // 根据当前路径更新活动标签
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

  // 动态计算下划线的位置和宽度
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);
    const activeTabElement = tabRefs.current[activeIndex];

    if (activeTabElement) {
      setUnderlineStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      });
    }
  }, [activeTab]);

  return (
    <div className="flex gap-4 relative">
      {/* 滑动下划线 */}
      <div
        className="absolute bottom-0 h-0.5 bg-orange-500"
        style={underlineStyle}
      />

      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.key;

        return (
          <div
            key={tab.key}
            className="relative"
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
          >
            <Link
              href={tab.href}
              className={`${raleway.className} font-semibold block py-1 ${
                isActive ? "text-gray-700" : "text-gray-500"
              } hover:text-gray-700 transition-colors duration-200`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar2;
