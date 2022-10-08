import { Container } from "pixi.js"
export type ComponentType = "button"
export type Pos = {
    x: number
    y: number
}

export type Size = {
    width: number
    height: number
}

/** 基础矩形 */
export type IBaseRect = Pos & Size

/** 基础圆 */
export type IBaseCircle = Pos & {
    r: number
}

export type ComponentStyle = {
    backGroundColor: string
    fontColor: string
    fontSize: number
    fontFaminly?: string
}

export interface IComponent {
    /** 实例id */
    id: number

    /** 组件对应的`pixi`容器 */
    instance: Container

    /** 父节点 */
    parent: IComponent | null

    /** 实例的子组件 */
    children: Map<number, IComponent>

    /** 实例的`x`坐标 */
    x: number

    /** 实例的`y`坐标 */
    y: number

    /** 实例的`width`坐标 */
    width: number

    /** 实例的`height`坐标 */
    height: number

    /** 是否可见 */
    visible: boolean

    /** 移动到该位置 */
    moveTo(x: number, y: number): void

    /** 相对于原坐标进行偏移 */
    moveBy(offsetX: number, offsetY: number): void

    /** 向组件容器添加元素 */
    push(...components: IComponent[]): void

    /**
     * 通过id删除子元素
     * @param id 组件id
     * @param destory 是否彻底销毁, 一旦彻底销毁不可调用被销毁的元素, 否则出错
     */
    remove(id: number, destory?: boolean): void

    /**
     * 通过组件自身删除子元素
     * @param component 组件实例
     * @param destory 是否彻底销毁, 一旦彻底销毁不可调用被销毁的元素, 否则出错
     */
    remove(component: IComponent, destory?: boolean): void

    /** 销毁自身, 会附带其子元素一同被销毁, 不应该使用被销毁后的容器*/
    destory(): void

    /** 递归的克隆自身 */
    clone(): IComponent
}

export interface IButton extends IComponent {}
