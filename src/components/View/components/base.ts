import { Graphics } from "pixi.js"
import { Pos, Size } from "./types"

export class BaseRect implements Size, Pos {
    private graphic: Graphics
    public constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {
        this.graphic = new Graphics()
            .beginFill(0xffffff)
            .drawRect(this.x, this.y, this.width, this.height)
            .endFill()
    }

    public static from(x: number, y: number, width: number, height: number) {
        return new BaseRect(x, y, width, height)
    }

    public build() {
        return this.graphic
    }

    public on(event: string, fn: (...args: any[]) => void) {
        if (!this.graphic) return
        this.graphic.interactive = true
        this.graphic.on(event, fn)
        return this
    }
}
