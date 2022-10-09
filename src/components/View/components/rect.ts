import { Graphics } from "pixi.js"
import { ComponentObject } from "./ComponentObject"
export type RectStyle = {
    backGroundColor: string
    border: string
}

export class Rect extends ComponentObject {
    private __rect: Graphics
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height)
        this.__rect = new Graphics()
    }
}
