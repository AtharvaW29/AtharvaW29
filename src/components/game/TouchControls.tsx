import type { PointerEvent } from "react";
import { bus, gameState } from "@/game/bus";

type Dir = keyof typeof gameState.pad;

function PadButton({ dir, label }: { dir: Dir; label: string }) {
  const set = (down: boolean) => (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    gameState.pad[dir] = down;
  };
  return (
    <button
      className={`px-pad-btn px-pad-${dir}`}
      aria-label={`Move ${dir}`}
      onPointerDown={set(true)}
      onPointerUp={set(false)}
      onPointerLeave={set(false)}
      onPointerCancel={set(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
    </button>
  );
}

/** On-screen d-pad and action button for touch devices. */
export function TouchControls() {
  return (
    <div className="px-touch">
      <div className="px-pad">
        <PadButton dir="up" label="▲" />
        <PadButton dir="left" label="◀" />
        <PadButton dir="right" label="▶" />
        <PadButton dir="down" label="▼" />
      </div>
      <button
        className="px-pad-btn px-pad-a"
        aria-label="Interact"
        onPointerDown={(e) => {
          e.preventDefault();
          bus.emit("action");
        }}
      >
        A
      </button>
    </div>
  );
}
