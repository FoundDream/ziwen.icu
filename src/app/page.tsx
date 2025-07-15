"use client";
import { dmSerifDisplay } from "@/fonts";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex">
      <div className="flex-3">
        <p
          className={`${dmSerifDisplay.className} text-xl mt-48 mb-10 text-orange-500 animate-fadeInUp`}
          style={{ animationDelay: '0s' }}
        >
          FrontEnd Developer
        </p>
        <p
          className={`${dmSerifDisplay.className} text-5xl mt-2 mb-2 animate-fadeInUp`}
          style={{ animationDelay: '0.2s' }}
        >
          Hi, I&apos;m Ziwen 👋
        </p>
        <p
          className={`${dmSerifDisplay.className} text-3xl mb-10 animate-fadeInUp`}
          style={{ animationDelay: '0.4s' }}
        >
          Welcome to my website
        </p>
        <p
          className={`${dmSerifDisplay.className} text-2xl text-gray-500 animate-fadeInUp`}
          style={{ animationDelay: '0.6s' }}
        >
          Currently living in Beijing, China
        </p>
      </div>
      <div
        className="flex-2 animate-fadeInRight"
        style={{ animationDelay: '0.7s' }}
      >
        <Image
          src="/heroImg.jpg"
          alt="profile"
          width={520}
          height={100}
          className="object-cover h-full"
          priority
        />
      </div>
    </div>
  );
};

export default Home;
