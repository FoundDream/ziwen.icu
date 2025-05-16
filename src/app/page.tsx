"use client";
import { dmSerifDisplay } from "@/fonts";
import Image from "next/image";

const Home = () => {
  return (
    <div className="w-full flex">
      <div className="flex-3">
        <p
          className={`${dmSerifDisplay.className} text-xl mt-48 mb-10 text-orange-500`}
        >
          FrontEnd Developer
        </p>
        <p className={`${dmSerifDisplay.className} text-5xl mt-2 mb-2`}>
          Hi, I&apos;m Ziwen 👋
        </p>
        <p className={`${dmSerifDisplay.className} text-3xl mb-10`}>
          Welcome to my website
        </p>
        <p className={`${dmSerifDisplay.className} text-2xl text-gray-500`}>
          Currently living in Beijing, China
        </p>
      </div>
      <div className="flex-2">
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
