import { Sprite, Text, TextStyle } from "pixi.js"
import { Rect } from "./rect"
import { DefaultButtonStyle } from "./style/default"
import { ButtonStyle } from "./style/types"
import { copyConfig } from "./style/utils"
// 可定义xy 也可不定义
export class Button extends Rect {
    public text: string
    public style: ButtonStyle
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
        const _style = copyConfig(style, DefaultButtonStyle)
        super(x, y, width, height, _style)
        this.text = "hello hello"
        this.style = _style
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
        const textStyle = new TextStyle({
            fontSize: this.style.fontSize,
            fill: this.style.color,
        })
        const text = new Text(this.text, textStyle)
        let x = this.x + this.style.border / 2 // 定位到无边框位置
        let y = this.y + this.style.border / 2
        const dx = (this.width - text.width) / 2
        const dy = (this.height - text.height) / 2
        text.x = x + dx
        text.y = y + dy
        this.__rect.addChild(text)
    }
}
