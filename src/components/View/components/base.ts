import { Container, Graphics } from "pixi.js"
import { IBaseRect, IComponent, Pos, Size } from "./types"

/** 组件基类 */
export class ComponentObject implements IComponent {
    private static counter = 0
    public id: number // 实例的唯一编号
    public box: IBaseRect
    public parent: IComponent | null
    public children: Map<number, IComponent>
    public instance: Container
    public constructor(x: number, y: number, width: number, height: number) {
        this.id = ComponentObject.counter++
        this.box = { x, y, width, height }
        this.parent = null
        this.children = new Map()
        const container = new Container()
        container.x = x
        container.y = y
        container.width = width
        container.height = height
        this.instance = container
    }

    isVisible(): boolean {
        return this.instance.visible
    }

    visible(isVisible: boolean): void {
        this.instance.visible = isVisible
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
        if (this.parent) {
            const isVaild = this.parent.children.has(this.id)
            if (!isVaild) {
                throw `预料之外的错误, 具有父元素时, 父元素的children属性应该具有该子元素. 当前id: ${this.id}`
            }
            this.parent.children.delete(this.id)
        }
        this.instance.destroy()
    }

    remove(id: number | IComponent, destory: boolean = false): void {
        if (typeof id !== "number") {
            return this.remove(id.id)
        }
        const child = this.children.get(id)
        if (!child) throw `id: ${id}, 并不存在该实例中.`
        this.children.delete(id)
        if (destory) child.destory()
    }

    /** 将组件加入container */
    push(...components: IComponent[]) {
        for (const component of components) {
            this.children.set(component.id, component)
            component.parent = this
            this.instance.addChild(component.instance)
        }
    }
}

export class BaseRect implements Size, Pos {
    private graphic: Graphics
    public constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {
        this.graphic = new Graphics()
            .beginFill(0xffffff)
            .drawRect(this.x, this.y, this.width, this.height)
            .endFill()
    }

    public static from(x: number, y: number, width: number, height: number) {
        return new BaseRect(x, y, width, height)
    }

    public build() {
        return this.graphic
    }

    public on(event: string, fn: (...args: any[]) => void) {
        if (!this.graphic) return
        this.graphic.interactive = true
        this.graphic.on(event, fn)
        return this
    }
}
