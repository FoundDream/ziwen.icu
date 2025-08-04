import { dmSerifDisplay } from "@/fonts";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "completed" | "in-progress" | "planned";
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI 减肥",
    description:
      "一个轻量、专注的 AI 减肥工具，支持体重追踪、饮食分析、热量盈亏判断。拒绝焦虑，拒绝商业化，只为帮你科学变瘦。",
    technologies: ["Vue3", "TypeScript", "Mobile", "H5"],
    githubUrl: "https://github.com/FoundDream/lose-weight-app",
    liveUrl: "https://lose-weight-app.vercel.app/",
    status: "in-progress",
  },
  {
    id: 2,
    title: "音乐展览",
    description: "一个音乐展览网站，用于收藏/分享自己喜欢的音乐作品",
    technologies: ["Nextjs", "TypeScript", "TailwindCSS", "React"],
    githubUrl: "https://github.com/FoundDream/music-player",
    liveUrl: "https://music-player-chi-rouge.vercel.app/",
    status: "in-progress",
  },
  {
    id: 3,
    title: "个人网站",
    description: "我的个人网站, 用于展示我的作品和技能",
    technologies: ["Nextjs", "TypeScript", "TailwindCSS", "React"],
    githubUrl: "https://github.com/FoundDream/ziwen.icu",
    liveUrl: "https://ziwen.icu/",
    status: "in-progress",
  },
];

// 项目卡片组件
const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <div
      className="bg-[#fcfcfc] rounded-lg shadow-md overflow-hidden project-card animate-fadeInUp border border-gray-200"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="p-6">
        <h3
          className={`${dmSerifDisplay.className} text-xl font-bold mb-2 text-gray-800`}
        >
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 text-sm"
            >
              <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={16}
                height={16}
              />
              代码
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200 text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              演示
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className="w-full">
      <p
        className={`${dmSerifDisplay.className} text-5xl mt-2 mb-6 mt-32 animate-fadeInUp`}
        style={{ animationDelay: "0s" }}
      >
        Projects
      </p>

      <p
        className="text-gray-500 mb-8 text-lg animate-fadeInUp"
        style={{ animationDelay: "0.2s" }}
      >
        这里是我的一些项目作品，涵盖了前端开发的各个方面。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
