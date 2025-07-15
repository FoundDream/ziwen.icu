"use client";
import { dmSerifDisplay } from "@/fonts";
import Image from "next/image";
import { useEffect, useState } from "react";

const Contact = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <p
        className={`${dmSerifDisplay.className} text-5xl mt-2 mb-6 mt-32 animate-fadeInUp`}
        style={{ animationDelay: '0s' }}
      >
        Contact Me
      </p>
      <div className="flex flex-col gap-4">
        <a
          href="https://github.com/FoundDream"
          className="flex items-center gap-2 animate-fadeIn hover:scale-105 transition-transform duration-200 origin-left"
          style={{ animationDelay: '0.3s' }}
        >
          <Image src="/icons/github.svg" alt="github" width={24} height={24} />
          <p>FoundDream</p>
        </a>
        <a
          href="mailto:ziwensong.cs@gmail.com"
          className="flex items-center gap-2 animate-fadeIn hover:scale-105 transition-transform duration-200 origin-left"
          style={{ animationDelay: '0.6s' }}
        >
          <Image src="/icons/mail.svg" alt="mail" width={24} height={24} />
          <p>ziwensong.cs@gmail.com</p>
        </a>
      </div>
    </div>
  );
};

export default Contact;
