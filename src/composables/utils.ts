const files = import.meta.glob("@/composables/utils/*.ts", { eager: true });

export const utils = Object.keys(files).reduce((acc, path) => {
    const name = path.replace(/^\/src\/composables\/utils\/(.*)\.\w+$/, "$1");
    acc[name] = files[path].default;
    return acc;
}, {});
