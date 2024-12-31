const files: Record<string, any> = import.meta.glob("@/composables/utils/*.ts", { eager: true });

interface Utils {
    [key: string]: any;
}

export const utils: Utils = Object.keys(files).reduce(
    (acc: Utils, path: string) => {
        const name = path.replace(
            /^\/src\/composables\/utils\/(.*)\.\w+$/,
            "$1"
        );
        acc[name] = files[path].default;
        return acc;
    },
    {}
);
