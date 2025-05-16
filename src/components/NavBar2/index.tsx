"use client";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const tabs = [
  { key: "Home", label: "Home", href: "/" },
  { key: "About", label: "About", href: "/about" },
  // { key: "Projects", label: "Projects", href: "/projects" },
  { key: "Contact", label: "Contact", href: "/contact" },
];

const NavBar2 = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => {
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`${raleway.className} font-semibold ${
              activeTab === tab.key ? "text-gray-700" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar2;
