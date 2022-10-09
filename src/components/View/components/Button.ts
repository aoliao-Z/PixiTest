import { Sprite, Text } from "pixi.js"
import { ComponentObject } from "./ComponentObject"
import { Rect } from "./rect"
import { ButtonStyle } from "./style/types"
// 可定义xy 也可不定义
export class Button extends Rect {
    public text: string
    protected __icon?: string
    protected __sprite?: Sprite
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        icon?: string,
        style?: ButtonStyle
    ) {
        super(x, y, width, height)
        this.text = "hello hello"
        if (this.__icon) this.__sprite = Sprite.from(this.__icon)
        this.__palceText()
    }

    /** 对模块实例进行摆放 */
    private __place() {
        const text = new Text(this.text)
        let x = this.x + this.style.border / 2 // 定位到无边框位置
        let y = this.y + this.style.border / 2
    }

    private __palceText() {
        const text = new Text(this.text)
        let x = this.x + this.style.border / 2 // 定位到无边框位置
        let y = this.y + this.style.border / 2
        const dx = (this.width - text.width) / 2
        const dy = (this.height - text.height) / 2
        text.x = x + dx
        text.y = y + dy
        this.__rect.addChild(text)
    }
}
