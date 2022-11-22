import { Sprite, Text, TextStyle } from "pixi.js"
import { Rect } from "./rect"
import { DefaultButtonStyle } from "./style/default"
import { ButtonStyle } from "./style/types"
import { copyConfig } from "./style/utils"
// 可定义xy 也可不定义
export class Button extends Rect {
    public style: ButtonStyle
    protected __icon?: string

    /** 图标实例 */
    protected __sprite?: Sprite

    /** 文字实例 */
    protected textInstance: Text

    protected clicks: ((...args: any[]) => void)[]

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
        this.style = _style
        if (this.__icon) this.__sprite = Sprite.from(this.__icon)
        this.textInstance = new Text("id: " + this.id.toString())
        this.__rect.addChild(this.textInstance)
        this.__palceText()
        this.clicks = []
        this.instance.on("click", (...args) => {
            this.clicks.forEach(fn => fn(...args))
        })
    }

    public get text() {
        return this.textInstance.text
    }

    public set text(s: string) {
        this.textInstance.text = s
        this.__palceText()
    }

    /** 对模块实例进行摆放 */
    private __place() {
        // const text = new Text(this.s)
        // let x = this.x + this.style.border / 2 // 定位到无边框位置
        // let y = this.y + this.style.border / 2
    }

    /** 文字居中 */
    private __palceText() {
        const textStyle = new TextStyle({
            fontSize: this.style.fontSize,
            fill: this.style.color,
        })
        this.textInstance.style = textStyle
        let x = this.x + this.style.border / 2 // 定位到无边框位置
        let y = this.y + this.style.border / 2
        const dx = (this.width - this.textInstance.width) / 2
        const dy = (this.height - this.textInstance.height) / 2
        this.textInstance.x = x + dx
        this.textInstance.y = y + dy
    }

    public onClick(fn: (...args: any[]) => void) {
        this.clicks.push(fn)
    }
}
