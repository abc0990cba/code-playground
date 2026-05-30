function simplifyPath(path: string): string {
    const stack = [];
    const elems = path.split('/');

    for(const el of elems) {
        if(el === '..') {
            if(stack.length) {
                stack.pop();
            }
        } else if(el !== '' && el !== '.') {
            stack.push(el);
        }
    }

    return '/' + stack.join('/');
};
