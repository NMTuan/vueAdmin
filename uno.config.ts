/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2024-04-25 09:47:19
 * @LastEditTime: 2024-08-26 21:28:59
 * @LastEditors: nmtuan nmtuan@qq.com
 * @Description:
 * @FilePath: \vueAdmin\uno.config.ts
 */
import {
    defineConfig,
    presetUno,
    presetIcons,
    presetAttributify,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            collections: {
                ri: () =>
                    import("@iconify-json/ri/icons.json").then(
                        (i) => i.default
                    ),
            },
            extraProperties: {
                display: "block",
            },
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    safelist: [],
});
