import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Text decode/scramble effect (CodePen classic): characters flicker through
// random glyphs, then resolve left-to-right into the final text. Starts when
// `start` flips true (so it fires after the preloader). Reduced-motion safe.
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#";

export default function ScrambleText({ text, start = true, className = "", speed = 34 }) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState("");
  const frame = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    // When reduced-motion is on, or the start gate hasn't opened yet, do
    // nothing — the render below derives the visible value from `reduce`
    // directly so no extra setState is needed here.
    if (reduce || !start) return;

    const total = text.length;
    let f = 0;
    const revealEvery = 1.6; // frames per resolved character
    const tick = () => {
      const revealed = Math.floor(f / revealEvery);
      let out = "";
      for (let i = 0; i < total; i++) {
        if (text[i] === " ") out += " ";
        else if (i < revealed) out += text[i];
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOutput(out);
      f++;
      if (revealed < total) {
        timer.current = setTimeout(() => {
          frame.current = requestAnimationFrame(tick);
        }, 1000 / speed);
      } else {
        setOutput(text);
      }
    };
    tick();
    return () => {
      clearTimeout(timer.current);
      cancelAnimationFrame(frame.current);
    };
  }, [text, start, reduce, speed]);

  // Derive the visible string: for reduced-motion (or before start) show the
  // real text immediately — no state write needed.
  const displayed = reduce || !start ? text : output || " ";

  return (
    <span className={className}>
      <span aria-hidden="true">{displayed}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
