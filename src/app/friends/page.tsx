"use client";
import { dmSerifDisplay } from "@/fonts";
import Image from "next/image";

const Friends = () => {
  return (
    <div className="w-full h-full flex">
      <div className="flex-3">
        <p
          className={`${dmSerifDisplay.className} text-5xl mt-2 mb-6 mt-32 animate-fadeInUp`}
          style={{ animationDelay: '0s' }}
        >
          Friends
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="flex items-center gap-4 p-4 bg-[#efeffe] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer animate-fadeInRight"
            style={{ animationDelay: '0.7s' }}
            onClick={() => {
              window.open("https://zjtdzyx.xyz/", "_blank");
            }}
          >
            <div className="relative w-12 h-12">
              <Image
                src="https://avatars.githubusercontent.com/u/162132584?v=4"
                alt="zjtdzyx"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <a
                className="text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                zjtdzyx
              </a>
              <p className="text-sm text-gray-500">前端开发工程师</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
