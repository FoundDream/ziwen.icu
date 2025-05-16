"use client";
import { dmSerifDisplay } from "@/fonts";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex">
      <div className="flex-3">
        <motion.p
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeInUp}
          className={`${dmSerifDisplay.className} text-xl mt-48 mb-10 text-orange-500`}
        >
          FrontEnd Developer
        </motion.p>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeInUp}
          className={`${dmSerifDisplay.className} text-5xl mt-2 mb-2`}
        >
          Hi, I&apos;m Ziwen 👋
        </motion.p>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeInUp}
          className={`${dmSerifDisplay.className} text-3xl mb-10`}
        >
          Welcome to my website
        </motion.p>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeInUp}
          className={`${dmSerifDisplay.className} text-2xl text-gray-500`}
        >
          Currently living in Beijing, China
        </motion.p>
      </div>
      <motion.div
        className="flex-2"
        initial="hidden"
        animate="visible"
        variants={fadeInRight}
      >
        <Image
          src="/heroImg.jpg"
          alt="profile"
          width={520}
          height={100}
          className="object-cover h-full"
          priority
        />
      </motion.div>
    </div>
  );
};

export default Home;
