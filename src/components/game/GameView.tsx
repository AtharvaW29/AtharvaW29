import { useCallback, useEffect, useRef, useState } from "react";
import type Phaser from "phaser";
import { locationById, locations, profile, type LocationId } from "@/data/portfolio";
import { bus, gameState, type GameAction } from "@/game/bus";
import { createGame } from "@/game/createGame";
import { Dialogue } from "./Dialogue";
import { Panel } from "./Panel";
import { TouchControls } from "./TouchControls";

const STORAGE_KEY = "wagh-town-discovered";

function loadDiscovered(): LocationId[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((id) => id in locationById) : [];
  } catch {
    return [];
  }
}

type Overlay =
  | { kind: "panel"; location: LocationId; entry?: string }
  | { kind: "dialogue"; speaker: string; lines: string[] }
  | { kind: "quests" }
  | null;

export default function GameView({ onQuickView }: { onQuickView: () => void }) {
  const mount = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [discovered, setDiscovered] = useState<LocationId[]>(loadDiscovered);
  const [toast, setToast] = useState<string | null>(null);
  const [touch] = useState(() => window.matchMedia("(pointer: coarse)").matches);

  // Boot Phaser once the pixel font is ready, so in-world labels render in it.
  useEffect(() => {
    let game: Phaser.Game | undefined;
    let cancelled = false;
    const fontReady = document.fonts?.load
      ? document.fonts.load('8px "Press Start 2P"').catch(() => undefined)
      : Promise.resolve();
    const timeout = new Promise((r) => setTimeout(r, 1500));
    Promise.race([fontReady, timeout]).then(() => {
      if (cancelled || !mount.current) return;
      game = createGame(mount.current);
      // Dev-only handle for poking at the scene from the console.
      if (import.meta.env.DEV) (window as unknown as { __game?: Phaser.Game }).__game = game;
    });
    // Resize the canvas the moment its container changes, rather than waiting
    // for Phaser's own polling.
    const el = mount.current;
    const observer = new ResizeObserver(() => {
      if (game && el && el.clientWidth > 0 && el.clientHeight > 0)
        game.scale.resize(el.clientWidth, el.clientHeight);
    });
    if (el) observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
      game?.destroy(true);
    };
  }, []);

  const locked = !started || overlay !== null;
  useEffect(() => {
    gameState.locked = locked;
    if (locked) gameState.pad = { up: false, down: false, left: false, right: false };
    return () => {
      gameState.locked = true;
    };
  }, [locked]);

  const openPanel = useCallback((location: LocationId, entry?: string) => {
    setOverlay({ kind: "panel", location, entry });
    setDiscovered((prev) => {
      if (prev.includes(location)) return prev;
      const next = [...prev, location];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* progress just won't persist */
      }
      setToast(
        next.length === locations.length
          ? "All locations discovered!"
          : `Discovered: ${locationById[location].place}`,
      );
      return next;
    });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(
    () =>
      bus.on("interact", (action: GameAction) => {
        if (action.type === "panel") openPanel(action.location, action.entry);
        else setOverlay({ kind: "dialogue", speaker: action.speaker, lines: action.lines });
      }),
    [openPanel],
  );

  const close = useCallback(() => setOverlay(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (!started) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setStarted(true);
        }
        return;
      }
      if (overlay?.kind === "quests" && (e.key === "Escape" || e.key === "q" || e.key === "Q")) {
        e.preventDefault();
        close();
      } else if (overlay === null && (e.key === "q" || e.key === "Q")) {
        setOverlay({ kind: "quests" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, overlay, close]);

  return (
    <div className="px-game">
      <div ref={mount} className="px-canvas" aria-hidden="true" />

      {started && (
        <>
          <div className="px-hud px-hud-left">
            <div className="px-window px-nameplate">
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
            </div>
          </div>
          <div className="px-hud px-hud-right">
            <button className="px-btn" onClick={() => setOverlay({ kind: "quests" })}>
              Map {discovered.length}/{locations.length}
            </button>
            <button className="px-btn px-btn-alt" onClick={onQuickView}>
              Resume view
            </button>
          </div>
          {!touch && overlay === null && (
            <p className="px-hint">
              <kbd>WASD</kbd> / <kbd>arrows</kbd> move · <kbd>E</kbd> interact · <kbd>Q</kbd> map
            </p>
          )}
          {touch && overlay === null && <TouchControls />}
        </>
      )}

      {toast && (
        <div className="px-toast" role="status">
          ★ {toast}
        </div>
      )}

      {!started && (
        <div className="px-scrim px-title-screen">
          <div className="px-title-card">
            <p className="px-kicker">A portfolio adventure</p>
            <h1 className="px-logo">{profile.name}</h1>
            <p className="px-tagline">
              {profile.role} · {profile.tagline}
            </p>
            <div className="px-title-actions">
              <button className="px-btn px-btn-big" onClick={() => setStarted(true)} autoFocus>
                ▶ Press Start
              </button>
              <button className="px-btn px-btn-alt px-btn-big" onClick={onQuickView}>
                Skip to resume
              </button>
            </div>
            <p className="px-status">
              <span className="px-dot" aria-hidden="true" /> {profile.status}
            </p>
          </div>
        </div>
      )}

      {overlay?.kind === "panel" && (
        <Panel
          key={`${overlay.location}-${overlay.entry ?? ""}`}
          location={locationById[overlay.location]}
          initialEntry={overlay.entry}
          onClose={close}
        />
      )}

      {overlay?.kind === "dialogue" && (
        <Dialogue key={overlay.lines[0]} speaker={overlay.speaker} lines={overlay.lines} onDone={close} />
      )}

      {overlay?.kind === "quests" && (
        <div className="px-scrim" onClick={close}>
          <div
            className="px-window px-panel px-quests"
            role="dialog"
            aria-modal="true"
            aria-label="Town map"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="px-panel-head">
              <div>
                <p className="px-kicker">
                  {discovered.length}/{locations.length} discovered
                </p>
                <h2 className="px-title">Town map</h2>
                <p className="px-blurb">Pick a place to jump straight in.</p>
              </div>
              <button className="px-btn px-btn-ghost" onClick={close} aria-label="Close">
                ESC ✕
              </button>
            </header>
            <ul className="px-quest-list">
              {locations.map((l, i) => (
                <li key={l.id}>
                  <button
                    className="px-list-item"
                    onClick={() => openPanel(l.id)}
                    autoFocus={i === 0}
                  >
                    <span className="px-check" aria-hidden="true">
                      {discovered.includes(l.id) ? "★" : "☆"}
                    </span>
                    <span>
                      {l.place}
                      <small>{l.section}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
