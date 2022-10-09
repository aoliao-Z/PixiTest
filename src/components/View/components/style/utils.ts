import Color from "color"
import { BorderStyle } from "./types"

/**
 * 解析`border`各个方向的线条宽度
 * @param cssBorder border宽度字符串
 * @returns [上, 右, 下, 左]边框长度
 */
export const parseBorder = (cssBorder: string | BorderStyle): BorderStyle => {
    if (typeof cssBorder !== "string") return cssBorder.map(v => v) as BorderStyle
    // 1. 分隔字符串
    const widths = cssBorder.split(" ").map(width => parseFloat(width))
    const size = widths.length
    // 上 右 下 左
    if (size === 1) return [widths[0], widths[0], widths[0], widths[0]]
    if (size === 2) return [widths[0], widths[1], widths[0], widths[1]]
    if (size === 3) return [widths[0], widths[1], widths[2], widths[1]]
    if (size === 4) return widths as BorderStyle
    throw `传递的border值有误, border: ${widths}`
}

/** 复制配置项 */
export const copyConfig = (source: any, target: any): any => {
    const isBaseType = (value: any) => {
        const type = typeof value
        if (type === "function" || type === "symbol") throw "配置文件不应该有函数类型或者symbol类型"
        if (type === "object") return false
        return true
    }
    const isBase = isBaseType(target)
    if (isBase) return source ?? target // source存在则读取source 否则读取target
    const obj = {} as any // 如果是对象类型, 则需要深度克隆
    for (const key in target) {
        if (!source || !source[key]) {
            // 如果不存在配置项, 且该字段为基本类型, 则读取target配置
            if (isBase) obj[key] = target[key]
            // 如果不是基本类型, 则递归读取
            else obj[key] = copyConfig(undefined, target[key])
        }
    }
    return obj
}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it("all", () => {
        const border = "1"
        const target = [1, 1, 1, 1]
        const source = parseBorder(border)
        expect(source).toEqual(target)
    })
    it("2 params", () => {
        const border = "1 2"
        const target = [1, 2, 1, 2]
        const source = parseBorder(border)
        expect(source).toEqual(target)
    })

    it("3 params", () => {
        const border = "1 2 1"
        const target = [1, 2, 1, 2]
        const source = parseBorder(border)
        expect(source).toEqual(target)
    })

    it("4 params", () => {
        const border = "1 2 3 4"
        const target = [1, 2, 3, 4]
        const source = parseBorder(border)
        expect(source).toEqual(target)
    })

    it("copyConfig", () => {
        const base = {}
        const config = {
            a: 1,
            b: 1,
            c: {
                d: {
                    v: 1,
                },
                f: {
                    p: {
                        d: 2,
                        e: true,
                        r: 1.0,
                    },
                    o: "string",
                },
            },
        }
        const target = {
            a: 1,
            b: 1,
            c: {
                d: {
                    v: 1,
                },
                f: {
                    p: {
                        d: 2,
                        e: true,
                        r: 1.0,
                    },
                    o: "string",
                },
            },
        }
        expect(copyConfig(base, config)).toEqual(target)
    })
}

export const parseColor = (color: string | Color | undefined) => {
    if (typeof color === "string") return new Color(color)
    if (typeof color === "undefined") return undefined
    return color
}
