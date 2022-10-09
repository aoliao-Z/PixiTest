<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { Application } from "pixi.js"
import { BaseRect } from "./components/base"
import { Rect } from "./components/rect"
const dom = ref()
onMounted(() => {
    const app = new Application({
        backgroundColor: 0x000000,
        resolution: 1,
    })
    const rect = new Rect(0, 0, 200, 200)
    const clone = rect.clone()
    clone.x = 100
    clone.y = 100
    app.stage.addChild(rect.instance, clone.instance)
    dom.value.appendChild(app.view)
})
</script>

<template>
    <div ref="dom"></div>
</template>

<style lang="scss">
//
</style>
