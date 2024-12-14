// 从obj对象中, 按照 path 获取值 path可以是a.b.c
export default (obj: Record<string, any>, path: string) => {
    return path
        .split(".")
        .reduce(
            (acc, part) =>
                acc && acc[part] !== undefined ? acc[part] : undefined,
            obj,
        );
};
