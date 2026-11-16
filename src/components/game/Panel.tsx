import { useEffect, useRef, useState } from "react";
import { EntryBody } from "@/components/EntryBody";
import type { LocationContent } from "@/data/portfolio";

interface PanelProps {
  location: LocationContent;
  initialEntry?: string;
  onClose: () => void;
}

/** RPG-style menu window: entry list on the left, details on the right. */
export function Panel({ location, initialEntry, onClose }: PanelProps) {
  const start = Math.max(
    0,
    location.entries.findIndex((e) => e.id === initialEntry),
  );
  const [index, setIndex] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const count = location.entries.length;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    detailRef.current?.scrollTo({ top: 0 });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        setIndex((i) => (i + 1) % count);
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        setIndex((i) => (i - 1 + count) % count);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, onClose]);

  const entry = location.entries[index];

  return (
    <div className="px-scrim" onClick={onClose}>
      <div
        ref={ref}
        className="px-window px-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${location.place}: ${location.section}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-panel-head">
          <div>
            <p className="px-kicker">{location.section}</p>
            <h2 className="px-title">{location.place}</h2>
            <p className="px-blurb">{location.blurb}</p>
          </div>
          <button className="px-btn px-btn-ghost" onClick={onClose} aria-label="Close">
            ESC ✕
          </button>
        </header>

        <div className={count > 1 ? "px-panel-body" : "px-panel-body px-panel-single"}>
          {count > 1 && (
            <nav className="px-list" aria-label={`${location.section} entries`}>
              {location.entries.map((e, i) => (
                <button
                  key={e.id}
                  className="px-list-item"
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                >
                  <span className="px-cursor" aria-hidden="true">
                    {i === index ? "▶" : ""}
                  </span>
                  {e.title}
                </button>
              ))}
            </nav>
          )}
          <div className="px-detail" ref={detailRef}>
            <EntryBody entry={entry} />
          </div>
        </div>

        {count > 1 && <footer className="px-panel-foot">↑ ↓ select · ESC close</footer>}
      </div>
    </div>
  );
}
