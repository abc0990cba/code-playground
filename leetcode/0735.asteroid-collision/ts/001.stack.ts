function asteroidCollision(asteroids: number[]): number[] {
    const stack = [];

    for(const ast of asteroids) {
        let marker: 'add' | 'no-ops' = 'add';

        while(stack.length && ast < 0 && stack.at(-1) > 0 && marker === 'add') {
            const diff = stack.at(-1) + ast;

            if(diff < 0) {
                stack.pop();
            } else if(diff > 0) {
                marker = 'no-ops';
            } else {
                stack.pop();
                marker = 'no-ops';
            }
        }

        if(marker === 'add') stack.push(ast);
    }

    return stack;
};
