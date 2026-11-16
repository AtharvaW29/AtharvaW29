import Phaser from "phaser";
import { WorldScene } from "./WorldScene";

export function createGame(parent: HTMLElement) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: "#24602e",
    pixelArt: true,
    roundPixels: true,
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: parent.clientWidth || 800,
      height: parent.clientHeight || 600,
    },
    banner: false,
    audio: { noAudio: true },
    scene: [WorldScene],
  });
}
