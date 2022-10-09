import Color from "color"

export type BorderStyle = [number, number, number, number]

export type RectStyle = {
    backGroundColor: string
    border: number
    borderColor?: string
    radius?: number
}

export type ButtonStyle = {
    rect: RectStyle
    /** 字体颜色 */
    color: string
    /** 字体大小 */
    fontSize: number
    /** 对齐方式 */
    align: "left" | "right" | "center"
}
