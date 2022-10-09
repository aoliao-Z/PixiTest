import Color from "color"

export type BorderStyle = [number, number, number, number]

export type RectStyle = {
    /** 背景颜色 */
    backGroundColor: string

    /** 边框厚度 */
    border: number

    /** 边框颜色 */
    borderColor?: string

    /** 圆角 */
    radius: number
}

export type ButtonStyle = {
    /** 字体颜色 */
    color: string

    /** 字体大小 */
    fontSize: number

    /** 对齐方式 */
    align: "left" | "right" | "center"
} & RectStyle
