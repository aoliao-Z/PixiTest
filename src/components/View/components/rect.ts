import Color from "color"
import { Graphics } from "pixi.js"
import { ComponentObject } from "./ComponentObject"
import { DefaultRectStyle } from "./style/default"
import { RectStyle } from "./style/types"
import { parseBorder, parseColor } from "./style/utils"

export class Rect extends ComponentObject {
    private __rect: Graphics
    public style: RectStyle
    constructor(x: number, y: number, width: number, height: number, style?: RectStyle) {
        super(x, y, width, height)
        this.style = this.__parseRectStyle(style)
        this.__rect = this.__draw()
        this.instance.addChild(this.__rect)
    }

    /**
     * 解析矩形样式
     * @param style
     * @returns
     */
    private __parseRectStyle(style?: RectStyle) {
        const styleOptions = { ...DefaultRectStyle, ...style }
        return styleOptions
    }

    private __draw() {
        const graphic = new Graphics()
        const width = this.style.border
        if (this.style.borderColor) {
            const color = new Color(this.style.borderColor).rgbNumber()

            graphic.lineStyle({ width, color })
        }
        return graphic
            .beginFill(new Color(this.style.backGroundColor).rgbNumber())
            .drawRect(
                this.x + width / 2,
                this.y + width / 2,
                this.width - width,
                this.height - width
            )
    }

    public clone(): Rect {
        // 如果到达最底层
        if (this.children.size === 0) {
            return new Rect(this.x, this.y, this.width, this.height, this.style)
        }
        const root = new Rect(this.x, this.y, this.width, this.height, this.style)
        for (const [id, child] of this.children) {
            root.push(child.clone())
        }
        return root
    }
}
