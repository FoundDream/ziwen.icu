import { dmSerifDisplay } from "@/fonts";
import Image from "next/image";

const Contact = () => {
  return (
    <div className="w-full">
      <p className={`${dmSerifDisplay.className} text-5xl mt-2 mb-6 mt-32`}>
        Contact Me
      </p>
      <div className="flex flex-col gap-4">
        <a
          href="https://github.com/FoundDream"
          className="flex items-center gap-2"
        >
          <Image src="/icons/github.svg" alt="github" width={24} height={24} />
          <p>FoundDream</p>
        </a>
        <a
          href="mailto:ziwensong.cs@gmail.com"
          className="flex items-center gap-2"
        >
          <Image src="/icons/mail.svg" alt="mail" width={24} height={24} />
          <p>ziwensong.cs@gmail.com</p>
        </a>
      </div>
    </div>
  );
};

export default Contact;
