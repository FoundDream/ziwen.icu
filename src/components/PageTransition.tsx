"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="w-full animate-slideInFromLeft relative z-10"
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
