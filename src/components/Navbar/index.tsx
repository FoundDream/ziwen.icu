import { useEffect, useRef, useState } from "react";

// Tab 配置
const tabs = [
  { key: "about", label: "about", href: "#about" },
  { key: "blog", label: "blog", href: "#blog" },
  { key: "projects", label: "projects", href: "#projects" },
  { key: "contact", label: "contact", href: "#contact" },
];

export default function AnimatedNavTabs() {
  const [active, setActive] = useState("about");
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({});

  // 动态计算滑块的位置和宽度
  useEffect(() => {
    const idx = tabs.findIndex((t) => t.key === active);
    console.log(tabRefs);
    const node = tabRefs.current[idx];
    if (node) {
      setSliderStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
        height: node.offsetHeight,
        transition: "all 0.3s cubic-bezier(.4,1,.4,1)",
      });
    }
  }, [active]);

  return (
    <nav className="relative flex gap-2 text-sm text-gray-700 bg-[#f0f0f0] rounded-full px-2 py-1">
      {/* 滑块背景 */}
      <div
        className="absolute z-0 bg-white shadow rounded-full"
        style={sliderStyle}
      />
      {/* Tab 列表 */}
      {tabs.map((tab, id) => (
        <a
          key={tab.key}
          href={tab.href}
          ref={(el) => {
            tabRefs.current[id] = el;
          }}
          className={`relative z-10 px-4 py-2 rounded-full cursor-pointer transition-colors duration-300 ${
            active === tab.key
              ? "text-blue-600 font-bold"
              : "hover:bg-[#e0e0e0] text-gray-700"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActive(tab.key);
          }}
        >
          {tab.label}
        </a>
      ))}
    </nav>
  );
}
