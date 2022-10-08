import { Container } from "pixi.js"
import { IComponent } from "./types"

/** 组件基类 */
export class ComponentObject implements IComponent {
    private static counter = 0
    public id: number // 实例的唯一编号
    public parent: IComponent | null
    public children: Map<number, IComponent>
    public instance: Container

    private _x: number
    private _y: number
    private _width: number
    private _height: number
    public constructor(x: number, y: number, width: number, height: number) {
        this.id = ComponentObject.counter++
        this._x = x
        this._y = y
        this._width = width
        this._height = height
        this.parent = null
        this.children = new Map()
        const container = new Container()
        container.x = x
        container.y = y
        container.width = width
        container.height = height
        this.instance = container
    }

    public get x() {
        return this._x
    }

    public set x(x: number) {
        this._x = x
        this.instance.x = x
    }

    public get y() {
        return this._y
    }

    public set y(y: number) {
        this._y = y
        this.instance.y = y
    }

    public get width() {
        return this._width
    }

    public set width(width: number) {
        this._width = width
        this.instance.width = width
    }

    public get height() {
        return this._height
    }

    public set height(height: number) {
        this._height = height
        this.instance.height = height
    }

    public get visible(): boolean {
        return this.instance.visible
    }

    public set visible(val: boolean) {
        this.instance.visible = val
    }

    moveTo(x: number, y: number): void {
        this.instance.x = x
        this.instance.y = y
    }

    moveBy(offsetX: number, offsetY: number): void {
        this.instance.x += offsetX
        this.instance.y += offsetY
    }

    destory(): void {
        // 使用bfs维护销毁后的children及parent结构
        const queue: IComponent[] = [this]
        while (queue.length !== 0) {
            const size = queue.length
            for (let i = 0; i < size; i++) {
                const node = queue.shift()!
                if (node.parent) {
                    const isVaild = node.parent.children.has(this.id)
                    if (!isVaild) {
                        throw `预料之外的错误: 具有父元素时, 父元素的children属性应该具有该子元素. 当前id: ${this.id}`
                    }
                    node.parent.children.delete(this.id)
                    node.parent = null
                }
                for (const [_, child] of node.children) {
                    queue.push(child)
                    node.remove(child)
                }
                if (node.children.size !== 0) throw "bfs遍历错误, 存在未删除的元素"
            }
        }
        this.instance.destroy() // pixi内部会将所有加入instance容器的子元素递归删除
    }

    remove(id: number | IComponent, destory: boolean = false): void {
        if (typeof id !== "number") {
            return this.remove(id.id)
        }
        const child = this.children.get(id)
        if (!child) throw `id: ${id}, 并不存在该实例中.`
        this.children.delete(id)
        child.parent = null
        this.instance.removeChild(child.instance) // ui层需要移除该元素
        if (destory) child.destory()
    }

    /** 将组件加入container */
    push(...components: IComponent[]) {
        for (const component of components) {
            if (component.parent !== null) {
                throw `id: ${component.id}, 已存在父组件, 不可将其添加至其它组件`
            }
            if (this.parent === component) {
                throw `引用错误: id: ${component.id} 与 id: ${this.id} 将造成parent属性相互引用`
            }
            this.children.set(component.id, component)
            component.parent = this
            this.instance.addChild(component.instance)
        }
    }
}

if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it("ComponentObject_constructor", () => {
        const base = new ComponentObject(0, 0, 20, 20) // id: 0
        expect(base.x).toBe(0)
        expect(base.y).toBe(0)
        expect(base.width).toBe(20)
        expect(base.height).toBe(20)
        expect(base.id).toBe(0)
    })

    it("push", () => {
        const base = new ComponentObject(0, 0, 20, 20) // id: 1
        const child = new ComponentObject(5, 5, 10, 10) // id: 2
        base.push(child)
        expect(child.parent).toBe(base)
        expect(base.children.get(2)).toBe(child)
    })

    it("remove", () => {
        // 删除一个元素后判断该元素是否能够正确处理parent与children的关系
        const base = new ComponentObject(0, 0, 20, 20) // id: 3
        const child = new ComponentObject(5, 5, 10, 10) // id: 4
        base.push(child)
        expect(child.parent).toBe(base)
        expect(base.children.get(4)).toBe(child)
        base.remove(child)
        expect(child.parent).toBeNull()
        expect(base.children.get(4)).toBeUndefined()
    })

    it("destory", () => {
        // 删除一个元素后判断该元素是否能够正确处理parent与children的关系
        const base = new ComponentObject(0, 0, 20, 20) // id: 5
        const child1 = new ComponentObject(5, 5, 10, 10) // id: 6
        const child2 = new ComponentObject(5, 5, 10, 10) // id: 7
        const child3 = new ComponentObject(5, 5, 10, 10) // id: 8
        child1.push(child2, child3)
        base.push(child1)
        // 验证树结构是否正确
        expect(child2.parent).toBe(child1)
        expect(child3.parent).toBe(child1)
        expect(child1.parent).toBe(base)
        expect(child1.children.get(7)).toBe(child2)
        expect(child1.children.get(8)).toBe(child3)
        expect(child1.children.size).toBe(2)
        expect(base.children.size).toBe(1)
        expect(base.children.get(6)).toBe(child1)
        base.destory() // 当根节点调用destory, 则其下所有子节点都应该被销毁
        expect(child2.parent).toBeNull() // 子元素父节点被消除
        expect(child3.parent).toBeNull() // 子元素父节点被消除
        expect(child1.parent).toBeNull() // 子元素父节点被消除
        expect(child1.children.size).toBe(0) // child1不再具有子元素
        expect(base.children.size).toBe(0) // base也不再具有子元素
    })
}
