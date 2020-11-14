class Promise {
    callbacks = [];
    state = "pending";
    value = null;
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    _resolve(value) {
        if (value && (typeof value === 'object' || typeof value === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                then.call(value, this._resolve.bind(this));
                return ;
            }
        }
        this.state = "fulfilled"; // 改变状态
        this.value = value; // 保存结果
        this.callbacks.forEach(callback => this._handle(callback));
    }
    /**
     * 
     * @param {*} onFulfilled 
     * 创建并返回了新的 Promise 实例，这是串行 Promise 的基础
     * 是实现真正链式调用的根本
     * then 方法传入的行参 onFulfilled 以及创建新 Promise 实例时传入的 resolve 放在一起
     * 被 push 到当前 Promise 的callbacks 队列中
     * 这是衔接当前 Promise 和 后邻 Promise的关键所在
     * 根据规范， onFulfilled 是可以为空的，为空时不调用 onFulfilled
     */
    then(onFulfilled) {
        return new Promise(resolve => {
            this._handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    }
    _handle(callback) {
        if (this.state === "pending") {
            this.callbacks.push(callback);
            return ;
        }
        // 如果 then 中没有传递任何东西
        if (!callback.onFulfilled) {
            callback.resolve(this.value);
            return ;
        }
        var ret = callback.onFulfilled(this.value);
        callback.resolve(ret);
    }
}