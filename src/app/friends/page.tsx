"use client";
import { dmSerifDisplay } from "@/fonts";
import { motion } from "motion/react";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.5 },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.7, duration: 0.6 },
  },
};

const Friends = () => {
  return (
    <div className="w-full h-full flex">
      <div className="flex-3">
        <motion.p
          className={`${dmSerifDisplay.className} text-5xl mt-2 mb-6 mt-32`}
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeInUp}
        >
          Friends
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInRight}
            className="flex items-center gap-4 p-4 bg-[#efeffe] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
