import { useCallback, useEffect, useState } from "react";

interface DialogueProps {
  speaker: string;
  lines: string[];
  onDone: () => void;
}

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Bottom-of-screen dialogue box with a typewriter effect. */
export function Dialogue({ speaker, lines, onDone }: DialogueProps) {
  const [line, setLine] = useState(0);
  const [shown, setShown] = useState(reducedMotion() ? lines[0].length : 0);
  const text = lines[line];
  const typing = shown < text.length;

  useEffect(() => {
    if (!typing) return;
    const id = window.setInterval(() => setShown((n) => n + 1), 16);
    return () => window.clearInterval(id);
  }, [typing, line]);

  const advance = useCallback(() => {
    if (typing) {
      setShown(text.length);
    } else if (line < lines.length - 1) {
      setLine(line + 1);
      setShown(reducedMotion() ? lines[line + 1].length : 0);
    } else {
      onDone();
    }
  }, [typing, text, line, lines, onDone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onDone();
      } else if (e.key === "e" || e.key === "E" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, onDone]);

  return (
    <div className="px-dialogue-wrap">
      {/* Keyboard is handled globally above; the click target is for mouse and touch. */}
      <div className="px-window px-dialogue" onClick={advance} role="dialog" aria-label={speaker} aria-live="polite">
        <span className="px-speaker">{speaker}</span>
        {/* Full text is always in the DOM for screen readers; the visible part types out. */}
        <span className="px-dialogue-text">
          <span>{text.slice(0, shown)}</span>
          <span className="px-untyped" aria-hidden="true">
            {text.slice(shown)}
          </span>
        </span>
        <span className="px-next" aria-hidden="true">
          {typing ? "" : line < lines.length - 1 ? "▼" : "■"}
        </span>
      </div>
    </div>
  );
}
