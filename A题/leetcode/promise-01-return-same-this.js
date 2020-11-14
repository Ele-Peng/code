class Promise {
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    callbacks = [];
    state = "pending"; // 保存状态
    value = null; // 保存结果
    then(onFullfilled) { // 注册回调函数，可以往观察者模式去思考
        if (this.state === "pending") {
            this.callbacks.push(onFullfilled);
        } else {
            onFullfilled(this.value);
        }
        return this;
    }
    _resolve(value) {
        this.state = "fullfilled"; // 改变状态
        this.value = value; // 保存结果
        this.callbacks.forEach(fn => fn(value)); // 当增加完状态之后，原先的_resolve中的定时器可以去掉了。当reolve同步执行时，虽然callbacks为空，回调函数还没有注册上来，但没有关系，因为后面注册上来时，判断状态为fulfilled，会立即执行回调。
    } 
}

let p = new Promise(resolve => {
    console.log("done");
    resolve('5秒');
}).then(tip => { // Promise then 方法并不是立即执行，而是等到 Promise 状态改变后，立即执行
    console.log('then1', tip);
}).then(tip => {
    console.log('then2', tip);
});