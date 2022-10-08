import { DisplayObject, Graphics } from "pixi.js"

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

export type ComponentStyle = {}

export interface IComponent {
    type: ComponentType
    box: IBaseRect
    style: ComponentStyle
    build(): DisplayObject // pixi显示层基类
}

export interface IButton extends IComponent {}

// TODO: 组件设置泛型? 然后工厂函数生成指定组件?
