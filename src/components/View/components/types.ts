import { Graphics } from "pixi.js"

export type ComponentType = "button"
export type Pos = {
    x: number
    y: number
}

export type Size = {
    width: number
    height: number
}

export type IBaseRect = Pos & Size

export type ComponentStyle = {}

export interface IComponent {
    type: ComponentType
    box: IBaseRect
    style: ComponentStyle
    build(): Graphics
}

export interface IButton extends IComponent {}
