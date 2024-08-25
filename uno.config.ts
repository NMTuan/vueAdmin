/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2024-04-25 09:47:19
 * @LastEditTime: 2024-05-02 07:17:34
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \dayin_canvas\uno.config.ts
 */
import {
    defineConfig,
    presetUno,
    presetIcons,
    presetAttributify,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    presets: [presetUno(), presetAttributify(), presetIcons()],
    transformers: [transformerDirectives(), transformerVariantGroup()]
})