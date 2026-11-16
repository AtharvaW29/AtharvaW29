import { EntryBody } from "@/components/EntryBody";
import { RESUME_URL, locations, profile } from "@/data/portfolio";

/** One-page, scrollable version of everything in the game. */
export default function QuickView({ onPlay }: { onPlay: () => void }) {
  return (
    <div className="px-quick">
      <header className="px-window px-quick-hero">
        <p className="px-kicker">{profile.location}</p>
        <h1 className="px-logo">{profile.name}</h1>
        <p className="px-tagline">
          {profile.role} · {profile.tagline}
        </p>
        <p className="px-status">
          <span className="px-dot" aria-hidden="true" /> {profile.status}
        </p>
        <div className="px-title-actions">
          <button className="px-btn" onClick={onPlay}>
            ▶ Play the game
          </button>
          <a className="px-btn px-btn-alt" href={RESUME_URL} download>
            Download resume
          </a>
          <a className="px-btn px-btn-alt" href={`mailto:${profile.email}`}>
            Email
          </a>
        </div>
      </header>

      <nav className="px-quick-nav" aria-label="Sections">
        {locations.map((l) => (
          <a key={l.id} href={`#section-${l.id}`}>
            {l.section}
          </a>
        ))}
      </nav>

      <main>
        {locations.map((l) => (
          <section key={l.id} id={`section-${l.id}`} className="px-window px-quick-section">
            <p className="px-kicker">{l.place}</p>
            <h2 className="px-title">{l.section}</h2>
            <div className={l.id === "skills" ? "px-quick-grid" : "px-quick-entries"}>
              {l.entries.map((e) => (
                <EntryBody key={e.id} entry={e} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="px-quick-foot">
        Built with React and Phaser 3. Every sprite is drawn in code.
      </footer>
    </div>
  );
}
