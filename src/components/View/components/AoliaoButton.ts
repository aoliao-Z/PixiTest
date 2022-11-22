import { Graphics, Text } from "pixi.js"
import { ComponentObject } from "./ComponentObject"
import { Rect } from "./rect"
import { ButtonStyle } from "./style/types"
import { DefaultButtonStyle } from "./style/default"
import Color from "color"
export class Button extends Rect {
    protected __button: Graphics
    public style: ButtonStyle
    protected __text: Text //实例
    constructor(x: number, y: number, width: number, height: number, style?: ButtonStyle) {
        super(x, y, width, height)
        this.style = this.__parseButtonStyle(style)
        this.__text = new Text("button")
        this.__button = this.__drawButton()
        this.instance.addChild(this.__rect, this.__button, this.__text)
        this.__placeText()
    }
    public get text() {
        return this.__text.text
    }

    public set text(text: string) {
        this.__text.text = text
        this.__placeText()
    }

    private __parseButtonStyle(style?: ButtonStyle) {
        const styleOptions = { ...DefaultButtonStyle, ...style }
        return styleOptions
    }

    private __drawButton() {
        const graphic = new Graphics()
        const width = this.style.border
        if (this.style.backGroundColor) {
            const color = new Color(this.style.backGroundColor).rgbNumber()
            graphic.lineStyle({ width, color })
        }
        return graphic
            .beginFill(new Color(this.style.backGroundColor).rgbNumber())
            .drawRoundedRect(
                this.x + width / 2,
                this.y + width / 2,
                this.width - width,
                this.height - width,
                this.style.radius
            )
    }

    public clone(): Button {
        // 如果到达最底层
        if (this.children.size === 0) {
            return new Button(this.x, this.y, this.width, this.height, { ...this.style })
        }
        const root = new Button(this.x, this.y, this.width, this.height, { ...this.style })
        for (const [id, child] of this.children) {
            root.push(child.clone())
        }
        return root
    }

    private __placeText(){
        this.__text.x = this.x + this.width / 2 - this.__text.width / 2
        this.__text.y = this.y + this.height / 2 - this.__text.height / 2
    }
}
