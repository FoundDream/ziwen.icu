import { useEffect, useState } from "react";

const Typewriter = ({
  text,
  speed = 80,
  pause = 1200,
}: {
  text: string;
  speed?: number;
  pause?: number;
}) => {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (index < text.length) {
      // 逐字显示
      timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((i) => i + 1);
      }, speed);
    } else {
      // 全部显示后暂停一段时间再重播
      timeout = setTimeout(() => {
        setDisplayed("");
        setIndex(0);
      }, pause);
    }
    return () => clearTimeout(timeout);
  }, [index, text, speed, pause]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-2 animate-pulse">|</span>
    </span>
  );
};

export default Typewriter;
