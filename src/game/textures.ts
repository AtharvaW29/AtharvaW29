// All art is painted in code onto canvas textures at load time.
// Nothing here is loaded from an image file.

import Phaser from "phaser";
import {
  BUILDING_H,
  BUILDING_W,
  MAP_H,
  MAP_W,
  TILE,
  buildings,
  mulberry32,
  type Building,
  type World,
} from "./world";

type Ctx = CanvasRenderingContext2D;

const INK = "#1a1423";

const rect = (ctx: Ctx, x: number, y: number, w: number, h: number, color: string) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

/** Adds a 1px dark outline around opaque pixels inside the given region. */
function outline(ctx: Ctx, x0: number, y0: number, w: number, h: number, color = INK) {
  const img = ctx.getImageData(x0, y0, w, h);
  const src = new Uint8ClampedArray(img.data);
  const solid = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < w && y < h && src[(y * w + x) * 4 + 3] > 0;
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      if (solid(x, y)) continue;
      if (solid(x - 1, y) || solid(x + 1, y) || solid(x, y - 1) || solid(x, y + 1)) {
        const i = (y * w + x) * 4;
        img.data[i] = r;
        img.data[i + 1] = g;
        img.data[i + 2] = b;
        img.data[i + 3] = 255;
      }
    }
  ctx.putImageData(img, x0, y0);
}

function canvasTexture(scene: Phaser.Scene, key: string, w: number, h: number) {
  if (scene.textures.exists(key)) scene.textures.remove(key);
  const tex = scene.textures.createCanvas(key, w, h)!;
  const ctx = tex.getContext();
  ctx.imageSmoothingEnabled = false;
  return { tex, ctx };
}

// ---------------------------------------------------------------- ground

function paintGround(scene: Phaser.Scene, world: World) {
  const { tex, ctx } = canvasTexture(scene, "ground", MAP_W * TILE, MAP_H * TILE);
  const rng = mulberry32(77);
  const at = (x: number, y: number) =>
    x < 0 || y < 0 || x >= MAP_W || y >= MAP_H ? "grass" : world.ground[y][x];

  for (let ty = 0; ty < MAP_H; ty++)
    for (let tx = 0; tx < MAP_W; tx++) {
      const x = tx * TILE;
      const y = ty * TILE;
      const g = world.ground[ty][tx];

      if (g === "grass") {
        rect(ctx, x, y, TILE, TILE, "#5aa646");
        for (let i = 0; i < 5; i++) {
          const px = x + Math.floor(rng() * 15);
          const py = y + Math.floor(rng() * 15);
          rect(ctx, px, py, 1, 2, rng() > 0.5 ? "#4c9440" : "#6dba54");
        }
      } else if (g === "path") {
        rect(ctx, x, y, TILE, TILE, "#dcbd80");
        for (let i = 0; i < 3; i++)
          rect(
            ctx,
            x + Math.floor(rng() * 14),
            y + Math.floor(rng() * 15),
            2,
            1,
            rng() > 0.5 ? "#c9a568" : "#ead09a",
          );
      } else if (g === "plaza") {
        rect(ctx, x, y, TILE, TILE, "#bdb8aa");
        rect(ctx, x, y, TILE, 1, "#a09b8d");
        rect(ctx, x, y + 8, TILE, 1, "#a09b8d");
        rect(ctx, x, y, 1, 8, "#a09b8d");
        rect(ctx, x + 8, y + 8, 1, 8, "#a09b8d");
        rect(ctx, x + 1, y + 1, 7, 1, "#cdc8ba");
        rect(ctx, x + 9, y + 9, 7, 1, "#cdc8ba");
      } else if (g === "pad") {
        rect(ctx, x, y, TILE, TILE, "#6d7480");
        rect(ctx, x, y, TILE, 1, "#585e69");
        rect(ctx, x, y, 1, TILE, "#585e69");
      } else {
        rect(ctx, x, y, TILE, TILE, "#3f8fd6");
        if (rng() > 0.45) rect(ctx, x + 2 + Math.floor(rng() * 8), y + 3 + Math.floor(rng() * 9), 5, 1, "#7cc0f2");
        if (rng() > 0.7) rect(ctx, x + 1 + Math.floor(rng() * 9), y + 2 + Math.floor(rng() * 11), 3, 1, "#2f76ba");
      }

      // Edges against neighbours
      if (g === "path" || g === "plaza") {
        const edge = g === "path" ? "#b8935a" : "#8b867a";
        if (at(tx, ty - 1) === "grass") rect(ctx, x, y, TILE, 1, edge);
        if (at(tx, ty + 1) === "grass") rect(ctx, x, y + 15, TILE, 1, edge);
        if (at(tx - 1, ty) === "grass") rect(ctx, x, y, 1, TILE, edge);
        if (at(tx + 1, ty) === "grass") rect(ctx, x + 15, y, 1, TILE, edge);
      }
      if (g === "water") {
        const shore = "#e8d9a6";
        const deep = "#2b68a8";
        if (at(tx, ty - 1) !== "water") {
          rect(ctx, x, y, TILE, 2, shore);
          rect(ctx, x, y + 2, TILE, 1, deep);
        }
        if (at(tx, ty + 1) !== "water") rect(ctx, x, y + 14, TILE, 2, shore);
        if (at(tx - 1, ty) !== "water") rect(ctx, x, y, 2, TILE, shore);
        if (at(tx + 1, ty) !== "water") rect(ctx, x + 14, y, 2, TILE, shore);
      }
    }

  // Landing pad marking
  const px = 19 * TILE;
  const py = 7 * TILE;
  ctx.strokeStyle = "#ffd23f";
  ctx.lineWidth = 2;
  ctx.strokeRect(px + 3, py + 3, 42, 42);
  rect(ctx, px + 16, py + 14, 3, 20, "#ffd23f");
  rect(ctx, px + 29, py + 14, 3, 20, "#ffd23f");
  rect(ctx, px + 16, py + 22, 16, 3, "#ffd23f");

  // Flowers
  for (const f of world.flowers) {
    rect(ctx, f.x, f.y + 1, 1, 2, "#2f7a3a");
    rect(ctx, f.x - 1, f.y, 3, 1, f.color);
    rect(ctx, f.x, f.y - 1, 1, 1, f.color);
  }

  tex.refresh();
}

// ----------------------------------------------------------------- props

function paintTree(scene: Phaser.Scene) {
  const { tex, ctx } = canvasTexture(scene, "tree", 18, 26);
  const ox = 1;
  const oy = 1;
  rect(ctx, ox + 6, oy + 16, 4, 7, "#6b4423");
  rect(ctx, ox + 6, oy + 16, 1, 7, "#523218");
  const rows: [number, number][] = [
    [5, 10], [3, 12], [2, 13], [2, 13], [1, 14], [1, 14], [1, 14], [1, 14],
    [1, 14], [1, 14], [1, 14], [2, 13], [2, 13], [3, 12], [5, 10],
  ];
  rows.forEach(([a, b], i) => {
    const y = oy + 1 + i;
    rect(ctx, ox + a, y, b - a + 1, 1, i > 10 ? "#24602e" : "#2f7a3a");
  });
  // highlights
  rect(ctx, ox + 4, oy + 3, 4, 2, "#4aa554");
  rect(ctx, ox + 3, oy + 5, 3, 2, "#4aa554");
  rect(ctx, ox + 9, oy + 6, 3, 1, "#3f9548");
  rect(ctx, ox + 5, oy + 9, 2, 1, "#3f9548");
  rect(ctx, ox + 10, oy + 10, 3, 1, "#24602e");
  outline(ctx, 0, 0, 18, 26);
  tex.refresh();
}

function paintSign(scene: Phaser.Scene) {
  const { tex, ctx } = canvasTexture(scene, "sign", 16, 16);
  rect(ctx, 7, 9, 2, 6, "#6b4423");
  rect(ctx, 2, 3, 12, 7, "#b98248");
  rect(ctx, 2, 3, 12, 1, "#d4a066");
  rect(ctx, 4, 5, 8, 1, "#6b4423");
  rect(ctx, 4, 7, 6, 1, "#6b4423");
  outline(ctx, 0, 0, 16, 16);
  tex.refresh();
}

function paintPrompt(scene: Phaser.Scene) {
  const { tex, ctx } = canvasTexture(scene, "prompt", 13, 15);
  rect(ctx, 2, 1, 9, 10, "#ffffff");
  rect(ctx, 1, 2, 11, 8, "#ffffff");
  rect(ctx, 5, 11, 3, 1, "#ffffff");
  rect(ctx, 6, 12, 1, 1, "#ffffff");
  // "!"
  rect(ctx, 6, 3, 1, 4, "#c0473b");
  rect(ctx, 6, 8, 1, 1, "#c0473b");
  outline(ctx, 0, 0, 13, 15);
  tex.refresh();
}

function paintShadow(scene: Phaser.Scene) {
  const { tex, ctx } = canvasTexture(scene, "shadow", 12, 5);
  ctx.fillStyle = "rgba(20, 30, 20, 0.35)";
  ctx.fillRect(2, 0, 8, 5);
  ctx.fillRect(1, 1, 10, 3);
  ctx.fillRect(0, 2, 12, 1);
  tex.refresh();
}

function paintDrone(scene: Phaser.Scene) {
  // two frames: rotor positions alternate
  const { tex, ctx } = canvasTexture(scene, "drone", 40, 14);
  for (let f = 0; f < 2; f++) {
    const ox = f * 20 + 1;
    const oy = 1;
    // arms
    rect(ctx, ox + 2, oy + 5, 14, 2, "#3b4350");
    // body
    rect(ctx, ox + 6, oy + 3, 6, 6, "#e8e6df");
    rect(ctx, ox + 6, oy + 7, 6, 2, "#b9b6ad");
    rect(ctx, ox + 8, oy + 5, 2, 2, "#c0473b");
    // legs
    rect(ctx, ox + 6, oy + 9, 1, 2, "#3b4350");
    rect(ctx, ox + 11, oy + 9, 1, 2, "#3b4350");
    // rotors
    if (f === 0) {
      rect(ctx, ox, oy + 3, 6, 1, "#8fd3ff");
      rect(ctx, ox + 12, oy + 3, 6, 1, "#8fd3ff");
    } else {
      rect(ctx, ox + 2, oy + 3, 2, 1, "#8fd3ff");
      rect(ctx, ox + 14, oy + 3, 2, 1, "#8fd3ff");
    }
    rect(ctx, ox + 2, oy + 4, 2, 1, "#3b4350");
    rect(ctx, ox + 14, oy + 4, 2, 1, "#3b4350");
    outline(ctx, f * 20, 0, 20, 14);
  }
  tex.add(0, 0, 0, 0, 20, 14);
  tex.add(1, 0, 20, 0, 20, 14);
  tex.refresh();
}

// ------------------------------------------------------------- buildings

export const BUILDING_PX_W = BUILDING_W * TILE;
export const BUILDING_PX_H = BUILDING_H * TILE + 8;

function paintBuilding(scene: Phaser.Scene, b: Building) {
  const W = BUILDING_PX_W;
  const H = BUILDING_PX_H;
  const { tex, ctx } = canvasTexture(scene, `building-${b.id}`, W, H);

  // Walls
  rect(ctx, 5, 44, W - 10, H - 45, b.wall);
  rect(ctx, 5, H - 5, W - 10, 4, b.wallDark);
  for (let y = 54; y < H - 6; y += 8)
    for (let x = 9 + (Math.floor(y / 8) % 2) * 6; x < W - 12; x += 14) rect(ctx, x, y, 5, 1, b.wallDark);

  // Roof
  for (let i = 0; i < 46; i++) {
    const inset = Math.max(1, 11 - Math.floor(i / 4));
    rect(ctx, inset, 1 + i, W - inset * 2, 1, i % 6 === 5 ? b.roofDark : b.roof);
  }
  rect(ctx, 1, 45, W - 2, 4, b.roofDark);
  rect(ctx, 12, 2, W - 24, 1, "#ffffff55");

  // Emblem plate
  const cx = W / 2;
  rect(ctx, cx - 10, 13, 20, 20, "#f4f1de");
  rect(ctx, cx - 11, 14, 22, 18, "#f4f1de");
  rect(ctx, cx - 10, 31, 20, 2, "#d6d1b8");
  b.icon.forEach((row, ry) => {
    for (let rx = 0; rx < row.length; rx++)
      if (row[rx] === "#") rect(ctx, cx - 7 + rx * 2, 16 + ry * 2, 2, 2, b.roofDark);
  });

  // Door
  rect(ctx, cx - 9, H - 27, 18, 26, "#4a2f1a");
  rect(ctx, cx - 7, H - 25, 14, 24, "#8a5a2e");
  rect(ctx, cx - 7, H - 25, 14, 2, "#a8743f");
  rect(ctx, cx - 1, H - 25, 1, 24, "#6b4423");
  rect(ctx, cx + 3, H - 13, 2, 2, "#ffd23f");
  // Step
  rect(ctx, cx - 11, H - 2, 22, 1, "#8b867a");

  // Windows
  for (const wx of [16, W - 34]) {
    rect(ctx, wx, 56, 18, 16, "#4a2f1a");
    rect(ctx, wx + 2, 58, 14, 12, "#9ad1f5");
    rect(ctx, wx + 2, 58, 14, 3, "#c9e8fb");
    rect(ctx, wx + 8, 58, 2, 12, "#4a2f1a");
    rect(ctx, wx + 2, 63, 14, 2, "#4a2f1a");
    rect(ctx, wx - 1, 72, 20, 2, b.wallDark);
  }

  outline(ctx, 0, 0, W, H);
  tex.refresh();
}

// ------------------------------------------------------------ characters

export interface CharPalette {
  hair: string;
  skin: string;
  shirt: string;
  shirtDark: string;
  pants: string;
  shoes: string;
}

export const CHAR_W = 16;
export const CHAR_H = 18;
export const DIRS = ["down", "left", "right", "up"] as const;
export type Dir = (typeof DIRS)[number];

function drawChar(ctx: Ctx, dir: "down" | "left" | "up", frame: number, p: CharPalette) {
  const r = (x: number, y: number, w: number, h: number, c: string) => rect(ctx, x, y, w, h, c);
  const eye = "#1a1423";

  // head
  r(4, 1, 8, 7, p.skin);
  if (dir === "up") {
    r(4, 1, 8, 6, p.hair);
    r(3, 2, 1, 4, p.hair);
    r(12, 2, 1, 4, p.hair);
  } else if (dir === "down") {
    r(4, 1, 8, 2, p.hair);
    r(3, 2, 1, 3, p.hair);
    r(12, 2, 1, 3, p.hair);
    r(4, 3, 1, 1, p.hair);
    r(11, 3, 1, 1, p.hair);
    r(6, 5, 1, 2, eye);
    r(9, 5, 1, 2, eye);
  } else {
    r(4, 1, 8, 2, p.hair);
    r(8, 3, 4, 3, p.hair);
    r(12, 2, 1, 4, p.hair);
    r(5, 5, 1, 2, eye);
  }

  // body
  r(4, 8, 8, 5, p.shirt);
  r(4, 12, 8, 1, p.shirtDark);
  if (dir === "left") {
    const swing = frame === 1 ? -1 : frame === 2 ? 1 : 0;
    r(7 + swing, 9, 2, 3, p.shirtDark);
    r(7 + swing, 12, 2, 1, p.skin);
  } else {
    const l = frame === 1 ? 1 : 0;
    const rr = frame === 2 ? 1 : 0;
    r(3, 8, 1, 4 - l, p.shirt);
    r(3, 12 - l, 1, 1, p.skin);
    r(12, 8, 1, 4 - rr, p.shirt);
    r(12, 12 - rr, 1, 1, p.skin);
  }

  // legs
  const leftUp = frame === 1 ? 1 : 0;
  const rightUp = frame === 2 ? 1 : 0;
  r(5, 13, 3, 3 - leftUp, p.pants);
  r(5, 16 - leftUp, 3, 1, p.shoes);
  r(8, 13, 3, 3 - rightUp, p.pants);
  r(8, 16 - rightUp, 3, 1, p.shoes);
}

function paintCharacter(scene: Phaser.Scene, key: string, p: CharPalette) {
  const { tex, ctx } = canvasTexture(scene, key, CHAR_W * 3 * DIRS.length, CHAR_H);
  DIRS.forEach((dir, d) => {
    for (let f = 0; f < 3; f++) {
      const ox = (d * 3 + f) * CHAR_W;
      ctx.save();
      if (dir === "right") {
        ctx.translate(ox + CHAR_W, 0);
        ctx.scale(-1, 1);
        drawChar(ctx, "left", f, p);
      } else {
        ctx.translate(ox, 0);
        drawChar(ctx, dir, f, p);
      }
      ctx.restore();
      outline(ctx, ox, 0, CHAR_W, CHAR_H);
      tex.add(d * 3 + f, 0, ox, 0, CHAR_W, CHAR_H);
    }
  });
  tex.refresh();
}

const PALETTES: Record<string, CharPalette> = {
  hero: { hair: "#2b1d16", skin: "#c68e5e", shirt: "#e0453a", shirtDark: "#a92f2a", pants: "#2e3f66", shoes: "#f4f1de" },
  guide: { hair: "#d9a441", skin: "#f0c8a0", shirt: "#3f9548", shirtDark: "#2c6d34", pants: "#6b4423", shoes: "#2b1d16" },
  engineer: { hair: "#5b3a22", skin: "#e0ac7e", shirt: "#f0a030", shirtDark: "#b9741c", pants: "#3b4350", shoes: "#2b1d16" },
  scholar: { hair: "#cfcfd6", skin: "#a8744c", shirt: "#4a5fb8", shirtDark: "#33428a", pants: "#2b2b3a", shoes: "#2b1d16" },
};

export function paintAllTextures(scene: Phaser.Scene, world: World) {
  paintGround(scene, world);
  paintTree(scene);
  paintSign(scene);
  paintPrompt(scene);
  paintShadow(scene);
  paintDrone(scene);
  buildings.forEach((b) => paintBuilding(scene, b));
  Object.entries(PALETTES).forEach(([key, p]) => paintCharacter(scene, key, p));
}
