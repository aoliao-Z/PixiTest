<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { Application } from "pixi.js"
import { BaseRect } from "./components/base"
const dom = ref()
onMounted(() => {
    const app = new Application({
        backgroundColor: 0x000000,
        resolution: 1,
    })
    const rect = BaseRect.from(0, 0, 200, 100)
    rect.on("click", data => console.log(data))
    app.stage.addChild(rect.build())
    dom.value.appendChild(app.view)
})
</script>

<template>
    <div ref="dom"></div>
</template>

<style lang="scss">
//
</style>
