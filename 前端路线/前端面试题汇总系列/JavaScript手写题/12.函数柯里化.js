// 指的是 将
const sum = (a, b, c, d) => a + b + c + d;
const curring = (fn) => {
    const exec = (sumArgs = []) => {
        if(sumArgs.length >= fn.length) {
            return fn(...sumArgs);
        } else {
            return exec([...sumArgs, ...args]);
        }
    }
}