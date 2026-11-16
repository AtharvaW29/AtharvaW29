import type { Entry } from "@/data/portfolio";

const isExternal = (href: string) => /^https?:/.test(href);

/** Renders one portfolio entry. Shared by the in-game panel and the quick view. */
export function EntryBody({ entry, heading = "h3" }: { entry: Entry; heading?: "h2" | "h3" }) {
  const H = heading;
  return (
    <div className="px-entry">
      <H className="px-entry-title">{entry.title}</H>
      {entry.subtitle && <p className="px-entry-subtitle">{entry.subtitle}</p>}
      {entry.meta && <p className="px-entry-meta">{entry.meta}</p>}
      {entry.summary && <p className="px-entry-summary">{entry.summary}</p>}
      {entry.bullets && (
        <ul className="px-bullets">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {entry.tags && (
        <ul className="px-tags" aria-label="Technologies">
          {entry.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      {entry.links && (
        <div className="px-links">
          {entry.links.map((l) => (
            <a
              key={l.href}
              className="px-btn px-btn-small"
              href={l.href}
              {...(isExternal(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(l.href.endsWith(".pdf") ? { download: true } : {})}
            >
              {l.label}
              {isExternal(l.href) && <span aria-hidden="true"> ↗</span>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
