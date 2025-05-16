import { dmSerifDisplay, raleway } from "@/fonts";

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

const ExperienceCard = ({
  title,
  experiences,
}: {
  title: string;
  experiences: {
    time?: string;
    description?: string;
    award?: string;
  }[];
}) => {
  return (
    <div className="mb-4">
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
    </div>
  );
};

const About = () => {
  return (
    <div className="w-full">
      <p className={`${dmSerifDisplay.className} text-5xl mt-2 mb-4 mt-32`}>
        About Me
      </p>
      <p className={`${dmSerifDisplay.className} text-l text-orange-500`}>
        The story of
      </p>
      <p className={`${dmSerifDisplay.className} text-2xl mb-4`}>Ziwen</p>
      <ExperienceCard title="教育经历" experiences={educationExperiences} />
      <ExperienceCard title="实习经历" experiences={internExperiences} />
      <ExperienceCard title="获奖经历" experiences={rewardExperiences} />
      <ExperienceCard
        title="参与过的开源项目"
        experiences={opensourceExperiences}
      />
    </div>
  );
};

export default About;
