import Phaser from "phaser";
import { bus, gameState } from "./bus";
import { BUILDING_PX_H, DIRS, paintAllTextures, type Dir } from "./textures";
import {
  BUILDING_H,
  MAP_H,
  MAP_W,
  SPAWN,
  TILE,
  buildWorld,
  buildings,
  npcs,
  signs,
  type Interactable,
  type World,
} from "./world";

const SPEED = 84;
const FONT = '"Press Start 2P", monospace';

type Keys = Record<"up" | "down" | "left" | "right" | "w" | "a" | "s" | "d" | "e" | "space" | "enter", Phaser.Input.Keyboard.Key>;

export class WorldScene extends Phaser.Scene {
  private world!: World;
  private player!: Phaser.GameObjects.Sprite;
  private shadow!: Phaser.GameObjects.Image;
  private prompt!: Phaser.GameObjects.Image;
  private keys?: Keys;
  private facing: Dir = "down";
  private target: Interactable | null = null;
  private wasLocked = true;
  /** Wall-clock time before which interact presses are ignored (avoids re-triggering on close). */
  private readyAt = 0;
  private wantAction = false;
  private offAction?: () => void;

  constructor() {
    super("world");
  }

  create() {
    this.world = buildWorld();
    paintAllTextures(this, this.world);

    this.add.image(0, 0, "ground").setOrigin(0).setDepth(-10);

    for (const t of this.world.trees) {
      const bottom = (t.y + 1) * TILE;
      this.add
        .image(t.x * TILE + TILE / 2, bottom + 1, "tree")
        .setOrigin(0.5, 1)
        .setDepth(bottom - 4);
    }

    for (const b of buildings) {
      const bottom = (b.y + BUILDING_H) * TILE;
      this.add
        .image(b.x * TILE, bottom, `building-${b.id}`)
        .setOrigin(0, 1)
        .setDepth(bottom - 2);
      this.add
        .text(b.x * TILE + 56, bottom - BUILDING_PX_H - 3, b.name.toUpperCase(), {
          fontFamily: FONT,
          fontSize: "8px",
          color: "#fff8e1",
          stroke: "#1a1423",
          strokeThickness: 4,
        })
        .setOrigin(0.5, 1)
        .setDepth(5000);
    }

    for (const s of signs) {
      const bottom = (s.y + 1) * TILE;
      this.add.image(s.x * TILE, bottom, "sign").setOrigin(0, 1).setDepth(bottom - 2);
    }

    this.createAnims();

    for (const n of npcs) {
      const cx = n.x * TILE + TILE / 2;
      const bottom = (n.y + 1) * TILE;
      if (n.sprite === "drone") {
        this.add.image(cx, bottom - 4, "shadow").setDepth(bottom - 3);
        const drone = this.add.sprite(cx, bottom - 12, "drone", 0).setDepth(bottom + 20);
        drone.play("drone-spin");
        this.tweens.add({
          targets: drone,
          y: drone.y - 3,
          duration: 900,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
        this.add
          .text(cx, bottom - 30, "ARES", {
            fontFamily: FONT,
            fontSize: "8px",
            color: "#ffd23f",
            stroke: "#1a1423",
            strokeThickness: 4,
          })
          .setOrigin(0.5, 1)
          .setDepth(5000);
      } else {
        this.add.image(cx, bottom - 1, "shadow").setDepth(bottom - 3);
        this.add.sprite(cx, bottom, n.sprite, 0).setOrigin(0.5, 1).setDepth(bottom - 2);
      }
    }

    this.shadow = this.add.image(SPAWN.x, SPAWN.y, "shadow");
    this.player = this.add.sprite(SPAWN.x, SPAWN.y, "hero", 0).setOrigin(0.5, 1);

    this.prompt = this.add.image(0, 0, "prompt").setDepth(6000).setVisible(false);
    this.tweens.add({
      targets: this.prompt,
      scale: { from: 1, to: 1.15 },
      duration: 420,
      yoyo: true,
      repeat: -1,
    });

    const kb = this.input.keyboard;
    if (kb) {
      this.keys = kb.addKeys(
        {
          up: Phaser.Input.Keyboard.KeyCodes.UP,
          down: Phaser.Input.Keyboard.KeyCodes.DOWN,
          left: Phaser.Input.Keyboard.KeyCodes.LEFT,
          right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
          w: Phaser.Input.Keyboard.KeyCodes.W,
          a: Phaser.Input.Keyboard.KeyCodes.A,
          s: Phaser.Input.Keyboard.KeyCodes.S,
          d: Phaser.Input.Keyboard.KeyCodes.D,
          e: Phaser.Input.Keyboard.KeyCodes.E,
          space: Phaser.Input.Keyboard.KeyCodes.SPACE,
          enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        },
        true,
      ) as Keys;
      // The title screen owns the keyboard until the player presses start.
      kb.disableGlobalCapture();
    }

    this.offAction = bus.on("action", () => {
      this.wantAction = true;
    });
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.offAction?.());

    const cam = this.cameras.main;
    cam.setBounds(0, 0, MAP_W * TILE, MAP_H * TILE);
    cam.setRoundPixels(true);
    cam.startFollow(this.player, true, 0.14, 0.14, 0, 10);
    cam.setBackgroundColor("#24602e");
    this.applyZoom();
    this.scale.on(Phaser.Scale.Events.RESIZE, this.applyZoom, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () =>
      this.scale.off(Phaser.Scale.Events.RESIZE, this.applyZoom, this),
    );
  }

  private applyZoom() {
    const { width, height } = this.scale;
    const zoom = Phaser.Math.Clamp(Math.round(Math.min(width / 400, height / 250)), 2, 6);
    // never show past the edge of the map
    const minZoom = Math.ceil(Math.max(width / (MAP_W * TILE), height / (MAP_H * TILE)));
    this.cameras.main.setZoom(Math.max(zoom, minZoom));
  }

  private createAnims() {
    DIRS.forEach((dir, d) => {
      const base = d * 3;
      const key = `hero-walk-${dir}`;
      if (this.anims.exists(key)) this.anims.remove(key);
      this.anims.create({
        key,
        frames: [base + 1, base, base + 2, base].map((frame) => ({ key: "hero", frame })),
        frameRate: 9,
        repeat: -1,
      });
    });
    if (this.anims.exists("drone-spin")) this.anims.remove("drone-spin");
    this.anims.create({
      key: "drone-spin",
      frames: [
        { key: "drone", frame: 0 },
        { key: "drone", frame: 1 },
      ],
      frameRate: 14,
      repeat: -1,
    });
  }

  private blocked(x: number, y: number) {
    // feet hitbox: 10 wide, 6 tall, anchored at the sprite's bottom centre
    const pts: [number, number][] = [
      [x - 5, y - 7],
      [x + 4, y - 7],
      [x - 5, y - 1],
      [x + 4, y - 1],
    ];
    return pts.some(([px, py]) => {
      const tx = Math.floor(px / TILE);
      const ty = Math.floor(py / TILE);
      if (tx < 0 || ty < 0 || tx >= MAP_W || ty >= MAP_H) return true;
      return this.world.solid[ty][tx];
    });
  }

  private idle() {
    this.player.anims.stop();
    this.player.setFrame(DIRS.indexOf(this.facing) * 3);
  }

  update(_time: number, deltaMs: number) {
    const kb = this.input.keyboard;
    const locked = gameState.locked;

    if (locked !== this.wasLocked) {
      this.wasLocked = locked;
      if (kb) {
        kb.resetKeys();
        if (locked) kb.disableGlobalCapture();
        else kb.enableGlobalCapture();
      }
      this.wantAction = false;
      this.readyAt = performance.now() + 220;
      if (locked) this.idle();
    }

    this.player.setDepth(this.player.y);
    this.shadow.setPosition(this.player.x, this.player.y - 1).setDepth(this.player.y - 1);

    if (locked) {
      this.prompt.setVisible(false);
      return;
    }

    const k = this.keys;
    const pad = gameState.pad;
    let dx = 0;
    let dy = 0;
    if (pad.left || k?.left.isDown || k?.a.isDown) dx -= 1;
    if (pad.right || k?.right.isDown || k?.d.isDown) dx += 1;
    if (pad.up || k?.up.isDown || k?.w.isDown) dy -= 1;
    if (pad.down || k?.down.isDown || k?.s.isDown) dy += 1;

    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy);
      const step = (SPEED * Math.min(deltaMs, 50)) / 1000;
      const nx = this.player.x + (dx / len) * step;
      const ny = this.player.y + (dy / len) * step;
      if (!this.blocked(nx, this.player.y)) this.player.x = nx;
      if (!this.blocked(this.player.x, ny)) this.player.y = ny;

      const dir: Dir = dy !== 0 && dx === 0 ? (dy < 0 ? "up" : "down") : dx < 0 ? "left" : dx > 0 ? "right" : this.facing;
      this.facing = dir;
      this.player.anims.play(`hero-walk-${dir}`, true);
    } else {
      this.idle();
    }

    // Nearest interactable in range
    let best: Interactable | null = null;
    let bestDist = Infinity;
    const fx = this.player.x;
    const fy = this.player.y - 4;
    for (const it of this.world.interactables) {
      const dist = Math.hypot(it.px - fx, it.py - fy);
      if (dist <= it.radius && dist < bestDist) {
        best = it;
        bestDist = dist;
      }
    }
    this.target = best;
    if (best) this.prompt.setPosition(best.promptX, best.promptY).setVisible(true);
    else this.prompt.setVisible(false);

    const pressed =
      this.wantAction ||
      (!!k &&
        (Phaser.Input.Keyboard.JustDown(k.e) ||
          Phaser.Input.Keyboard.JustDown(k.space) ||
          Phaser.Input.Keyboard.JustDown(k.enter)));
    this.wantAction = false;
    if (pressed && this.target && performance.now() >= this.readyAt) {
      this.idle();
      bus.emit("interact", this.target.action);
    }
  }
}

