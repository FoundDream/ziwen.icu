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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom: number) => ({
    opacity: 1,
    transition: { delay: custom * 0.3, duration: 0.6 },
  }),
};

const Contact = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <motion.p
        className={`${dmSerifDisplay.className} text-5xl mt-2 mb-6 mt-32`}
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeInUp}
      >
        Contact Me
      </motion.p>
      <div className="flex flex-col gap-4">
        <motion.a
          href="https://github.com/FoundDream"
          className="flex items-center gap-2"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          style={{ transformOrigin: "left center" }}
        >
          <Image src="/icons/github.svg" alt="github" width={24} height={24} />
          <p>FoundDream</p>
        </motion.a>
        <motion.a
          href="mailto:ziwensong.cs@gmail.com"
          className="flex items-center gap-2"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          style={{ transformOrigin: "left center" }}
        >
          <Image src="/icons/mail.svg" alt="mail" width={24} height={24} />
          <p>ziwensong.cs@gmail.com</p>
        </motion.a>
      </div>
    </div>
  );
};

export default Contact;
