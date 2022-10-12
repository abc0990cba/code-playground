function call<T extends unknown[], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    return f(...args);
}

function fill(length: number, value: string): string[] {
    return Array.from({ length }, () => value);
}

call(fill, 5, 'b');