// Tiny bridge between the Phaser scene and the React UI.
// Deliberately has no Phaser import so the UI bundle stays light.

import type { LocationId } from "@/data/portfolio";

export type GameAction =
  | { type: "panel"; location: LocationId; entry?: string }
  | { type: "dialogue"; speaker: string; lines: string[] };

type Events = {
  interact: GameAction;
  /** Virtual "A" button pressed (touch controls) */
  action: void;
};

type Handler<T> = (payload: T) => void;

const handlers: { [K in keyof Events]?: Set<Handler<Events[K]>> } = {};

export const bus = {
  on<K extends keyof Events>(event: K, fn: Handler<Events[K]>): () => void {
    const set = (handlers[event] ??= new Set() as never) as Set<Handler<Events[K]>>;
    set.add(fn);
    return () => set.delete(fn);
  },
  emit<K extends keyof Events>(event: K, payload?: Events[K]) {
    const set = handlers[event] as Set<Handler<Events[K]>> | undefined;
    set?.forEach((fn) => fn(payload as Events[K]));
  },
};

/** Shared mutable state the scene polls every frame. */
export const gameState = {
  /** True while a React overlay (title, panel, dialogue) owns the keyboard. */
  locked: true,
  pad: { up: false, down: false, left: false, right: false },
};
