export type BorderStyle = [number, number, number, number]
/**
 * 解析`border`各个方向的线条宽度
 * @param cssBorder border宽度字符串
 * @returns [上, 右, 下, 左]边框长度
 */
export const parseBorder = (cssBorder: string): BorderStyle => {
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
}
