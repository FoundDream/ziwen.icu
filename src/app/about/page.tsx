"use client";
import { dmSerifDisplay, raleway } from "@/fonts";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const educationExperiences = [
  { time: "2023.09 - 2027.06", description: "本科生在读 中央民族大学" },
];

const rewardExperiences = [
  {
    time: "2025.04",
    description: "十六届蓝桥杯全国软件和信息技术专业人才大赛 Web开发",
    award: "北京二等奖",
  },
  {
    time: "2024.09",
    description: "专业奖学金",
    award: "二等奖",
  },
  {
    time: "2024.07",
    description: "互联网+创新创业大赛",
    award: "北京三等奖",
  },
];

const internExperiences = [
  {
    time: "2025.03 - 至今",
    description: "小红书 - 社区",
  },
  {
    time: "2024.10 - 2025.03",
    description: "美团 - 金融服务",
  },
  {
    time: "2024.07 - 2024.09",
    description: "泰康在线 - 健康险",
  },
];

const opensourceExperiences = [
  {
    description: "Formily - Alibaba",
    link: "https://github.com/alibaba/formily",
  },
  {
    description: "VisActor - ByteDance",
    link: "https://github.com/alibaba/formily",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.4 },
  }),
};

const ExperienceCard = ({
  title,
  experiences,
  customDelay,
}: {
  title: string;
  experiences: {
    time?: string;
    description?: string;
    award?: string;
  }[];
  customDelay: number;
}) => {
  return (
    <motion.div
      className="mb-4"
      initial="hidden"
      animate="visible"
      custom={customDelay}
      variants={fadeInUp}
    >
      <p className={`${raleway.className} text-l font-[500]`}>{title}</p>
      {experiences.map((experience, index) => (
        <div key={index}>
          <p className="font-[400]">{experience.time}</p>
          <p className="font-[400]">
            {experience.description}{" "}
            <span className="font-[600]">{experience.award}</span>
          </p>
        </div>
      ))}
    </motion.div>
  );
};

const About = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <motion.p
        className={`${dmSerifDisplay.className} text-5xl mt-2 mb-4 mt-32`}
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeInUp}
      >
        About Me
      </motion.p>
      <motion.p
        className={`${dmSerifDisplay.className} text-l text-orange-500`}
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeInUp}
      >
        The story of
      </motion.p>
      <motion.p
        className={`${dmSerifDisplay.className} text-2xl mb-4`}
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeInUp}
      >
        Ziwen
      </motion.p>
      <ExperienceCard
        title="教育经历"
        experiences={educationExperiences}
        customDelay={3}
      />
      <ExperienceCard
        title="实习经历"
        experiences={internExperiences}
        customDelay={4}
      />
      <ExperienceCard
        title="获奖经历"
        experiences={rewardExperiences}
        customDelay={5}
      />
      <ExperienceCard
        title="参与过的开源项目"
        experiences={opensourceExperiences}
        customDelay={6}
      />
    </div>
  );
};

export default About;
