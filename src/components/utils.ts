export const add = (a: number, b: number) => a + b

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it("test_add", () => {
        const target = 2
        const source = add(1, 1)
        expect(source).toBe(target)
    })
}
