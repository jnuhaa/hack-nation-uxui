import { useEffect, useState } from "react";

export function TypingText({ text, speed = 90, onComplete }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setTimeout(() => onComplete?.(), 350);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <>{displayed}</>;
}
