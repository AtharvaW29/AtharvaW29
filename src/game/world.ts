// Town layout as plain data. No Phaser imports: the scene and the texture
// painter both read from here.

import type { LocationId } from "@/data/portfolio";
import { locationById } from "@/data/portfolio";
import type { GameAction } from "./bus";

export const TILE = 16;
export const MAP_W = 56;
export const MAP_H = 40;

export type Ground = "grass" | "path" | "water" | "plaza" | "pad";

export interface Building {
  id: LocationId;
  name: string;
  /** Top-left tile of the 7x5 footprint */
  x: number;
  y: number;
  roof: string;
  roofDark: string;
  wall: string;
  wallDark: string;
  icon: string[];
}

export interface Npc {
  id: string;
  x: number;
  y: number;
  sprite: "guide" | "engineer" | "scholar" | "drone";
  action: GameAction;
}

export interface Sign {
  x: number;
  y: number;
  action: GameAction;
}

export interface Interactable {
  /** World-pixel point the player must stand near */
  px: number;
  py: number;
  radius: number;
  /** Where the prompt bubble floats */
  promptX: number;
  promptY: number;
  action: GameAction;
}

export const BUILDING_W = 7;
export const BUILDING_H = 5;

const ICONS: Record<LocationId, string[]> = {
  // 7x7 emblems, '#' = ink
  experience: ["......#", ".....##", "#...##.", ".#.##..", "..##...", ".#.#...", "#...#.."],
  projects: ["..#.#..", ".#####.", "###.###", ".#...#.", "###.###", ".#####.", "..#.#.."],
  research: [".......", "###.###", "#.#.#.#", "#.#.#.#", "#.#.#.#", "###.###", "...#..."],
  education: ["...#...", ".#####.", "#######", ".#####.", "..###.#", "..###.#", "......#"],
  skills: ["#######", "#.....#", "#.###.#", "#.###.#", ".#.#.#.", "..#.#..", "...#..."],
  arcade: ["...#...", "..###..", "...#...", "...#...", ".#####.", "#.#.#.#", "#######"],
  contact: [".......", "#######", "##...##", "#.#.#.#", "#..#..#", "#.....#", "#######"],
  about: ["...#...", "..###..", ".#####.", "#######", ".#...#.", ".#.#.#.", ".#.#.#."],
};

const TOP_Y = 13;
const BOTTOM_Y = 26;

function building(
  id: LocationId,
  x: number,
  y: number,
  roof: string,
  roofDark: string,
  wall: string,
  wallDark: string,
): Building {
  return { id, name: locationById[id].place, x, y, roof, roofDark, wall, wallDark, icon: ICONS[id] };
}

export const buildings: Building[] = [
  building("experience", 7, TOP_Y, "#c0473b", "#8f2f2b", "#e8d5b0", "#c9b48c"),
  building("projects", 17, TOP_Y, "#d98a2b", "#a8641c", "#d9d2c5", "#b5ad9f"),
  building("research", 32, TOP_Y, "#3f6fb5", "#2b4d85", "#ead9c0", "#c8b698"),
  building("education", 42, TOP_Y, "#7d4fb0", "#583683", "#e6dccb", "#c2b7a3"),
  building("skills", 7, BOTTOM_Y, "#5c6672", "#3f4750", "#d6cfc2", "#b0a999"),
  building("arcade", 17, BOTTOM_Y, "#d1458f", "#9a2d68", "#e3d8e6", "#bdb0c2"),
  building("contact", 32, BOTTOM_Y, "#2f9c8f", "#1f6e66", "#efe2c8", "#cdbf9f"),
  building("about", 42, BOTTOM_Y, "#4c9a4a", "#346e35", "#f0dfc0", "#cfbb96"),
];

export const npcs: Npc[] = [
  {
    id: "guide",
    x: 30,
    y: 20,
    sprite: "guide",
    action: {
      type: "dialogue",
      speaker: "Town Guide",
      lines: [
        "Welcome to Wagh Town! Everything here was built by Atharva, a software engineer and MS CS student at USC.",
        "Each building holds part of his story. The Guild Hall has his work experience, and the Workshop has his projects.",
        "Walk up to a door and press E to go in. In a hurry? The RESUME VIEW button up top shows everything on one page.",
      ],
    },
  },
  {
    id: "engineer",
    x: 23,
    y: 19,
    sprite: "engineer",
    action: {
      type: "dialogue",
      speaker: "Engineer",
      lines: [
        "Hear that hammering in the Workshop? He is building a relational database from scratch in C++. Calls it NothingDB.",
        "Pages, tuples, B+ trees... no shortcuts. I respect it.",
      ],
    },
  },
  {
    id: "scholar",
    x: 38,
    y: 19,
    sprite: "scholar",
    action: {
      type: "dialogue",
      speaker: "Scholar",
      lines: [
        "The Library keeps his 2024 paper on blockchain-enabled peer-to-peer trading for renewable energy.",
        "Lately he is researching how a drone can keep flying safely when its LiDAR drops out. Look for the landing pad up north.",
      ],
    },
  },
  {
    id: "drone",
    x: 20,
    y: 8,
    sprite: "drone",
    action: { type: "panel", location: "projects", entry: "ares" },
  },
];

export const signs: Sign[] = [
  {
    x: 23,
    y: 23,
    action: {
      type: "dialogue",
      speaker: "Signpost",
      lines: [
        "NORTH: Guild Hall, Workshop, Library, Academy.",
        "SOUTH: Armory, Arcade, Post Office, Home.",
        "FAR NORTH: ARES landing pad and Lake Latency.",
      ],
    },
  },
  {
    x: 32,
    y: 9,
    action: {
      type: "dialogue",
      speaker: "Lake Latency",
      lines: ["Lake Latency. Average depth: O(log n). No swimming during deployments."],
    },
  },
];

export const SPAWN = { x: 28 * TILE, y: 22 * TILE + 8 };

/** Small deterministic RNG so the town looks the same on every load. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface World {
  ground: Ground[][];
  solid: boolean[][];
  trees: { x: number; y: number }[];
  flowers: { x: number; y: number; color: string }[];
  interactables: Interactable[];
}

export function buildWorld(): World {
  const ground: Ground[][] = Array.from({ length: MAP_H }, () =>
    Array<Ground>(MAP_W).fill("grass"),
  );
  const solid: boolean[][] = Array.from({ length: MAP_H }, () => Array<boolean>(MAP_W).fill(false));
  const reserved: boolean[][] = Array.from({ length: MAP_H }, () =>
    Array<boolean>(MAP_W).fill(false),
  );

  const fill = (x0: number, y0: number, x1: number, y1: number, g: Ground) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) ground[y][x] = g;
  };
  const reserve = (x0: number, y0: number, x1: number, y1: number) => {
    for (let y = Math.max(0, y0); y <= Math.min(MAP_H - 1, y1); y++)
      for (let x = Math.max(0, x0); x <= Math.min(MAP_W - 1, x1); x++) reserved[y][x] = true;
  };

  // Roads
  fill(5, 21, 50, 22, "path");
  fill(5, 33, 50, 34, "path");
  fill(27, 8, 28, 34, "path");
  fill(22, 8, 26, 8, "path");
  // Plaza and landing pad
  fill(24, 19, 31, 24, "plaza");
  fill(19, 7, 21, 9, "pad");

  // Lake
  for (let y = 4; y <= 12; y++)
    for (let x = 33; x <= 46; x++) {
      const dx = (x - 39.5) / 5.6;
      const dy = (y - 8) / 3.2;
      if (dx * dx + dy * dy <= 1) ground[y][x] = "water";
    }

  // Buildings: footprint, door stub path
  for (const b of buildings) {
    const doorX = b.x + 3;
    const frontY = b.y + BUILDING_H;
    const roadY = b.y === TOP_Y ? 20 : 32;
    fill(doorX, frontY, doorX, roadY, "path");
    for (let y = b.y + 1; y < b.y + BUILDING_H; y++)
      for (let x = b.x; x < b.x + BUILDING_W; x++) solid[y][x] = true;
    reserve(b.x - 1, b.y - 2, b.x + BUILDING_W, b.y + BUILDING_H + 1);
  }

  // Water is solid
  for (let y = 0; y < MAP_H; y++)
    for (let x = 0; x < MAP_W; x++) if (ground[y][x] === "water") solid[y][x] = true;

  // Keep trees one tile away from anything that is not grass
  for (let y = 0; y < MAP_H; y++)
    for (let x = 0; x < MAP_W; x++)
      if (ground[y][x] !== "grass") reserve(x - 1, y - 1, x + 1, y + 1);

  for (const n of npcs) {
    solid[n.y][n.x] = true;
    reserve(n.x - 1, n.y - 1, n.x + 1, n.y + 1);
  }
  for (const s of signs) {
    solid[s.y][s.x] = true;
    reserve(s.x - 1, s.y - 1, s.x + 1, s.y + 1);
  }

  // Trees: border wall plus scattered groves
  const rng = mulberry32(2907);
  const trees: { x: number; y: number }[] = [];
  const plant = (x: number, y: number) => {
    trees.push({ x, y });
    solid[y][x] = true;
    reserved[y][x] = true;
  };
  for (let y = 0; y < MAP_H; y++)
    for (let x = 0; x < MAP_W; x++) {
      const border = x < 2 || y < 2 || x >= MAP_W - 2 || y >= MAP_H - 2;
      if (border) plant(x, y);
    }
  for (let i = 0; i < 520 && trees.length < 2 * (MAP_W + MAP_H) * 2 + 95; i++) {
    const x = 2 + Math.floor(rng() * (MAP_W - 4));
    const y = 2 + Math.floor(rng() * (MAP_H - 4));
    if (reserved[y][x]) continue;
    plant(x, y);
    // leave a walkable gap around each scattered tree so groves never form walls
    reserve(x - 1, y - 1, x + 1, y + 1);
  }

  const flowerColors = ["#ffd23f", "#ff7aa8", "#ffffff", "#b58cff"];
  const flowers: { x: number; y: number; color: string }[] = [];
  for (let i = 0; i < 260; i++) {
    const x = 2 + Math.floor(rng() * (MAP_W - 4));
    const y = 2 + Math.floor(rng() * (MAP_H - 4));
    if (ground[y][x] !== "grass" || solid[y][x]) continue;
    flowers.push({
      x: x * TILE + 2 + Math.floor(rng() * 11),
      y: y * TILE + 2 + Math.floor(rng() * 11),
      color: flowerColors[Math.floor(rng() * flowerColors.length)],
    });
  }

  const interactables: Interactable[] = [];
  for (const b of buildings) {
    const cx = (b.x + 3) * TILE + TILE / 2;
    interactables.push({
      px: cx,
      py: (b.y + BUILDING_H) * TILE + 6,
      radius: 14,
      promptX: cx,
      promptY: (b.y + BUILDING_H) * TILE - 28,
      action: { type: "panel", location: b.id },
    });
  }
  for (const n of npcs) {
    const cx = n.x * TILE + TILE / 2;
    const cy = n.y * TILE + TILE / 2;
    interactables.push({
      px: cx,
      py: cy,
      radius: n.sprite === "drone" ? 30 : 24,
      promptX: cx,
      promptY: cy - (n.sprite === "drone" ? 26 : 22),
      action: n.action,
    });
  }
  for (const s of signs) {
    const cx = s.x * TILE + TILE / 2;
    const cy = s.y * TILE + TILE / 2;
    interactables.push({
      px: cx,
      py: cy,
      radius: 24,
      promptX: cx,
      promptY: cy - 18,
      action: s.action,
    });
  }

  return { ground, solid, trees, flowers, interactables };
}
