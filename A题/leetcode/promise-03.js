class Promise {
    callbacks = [];
    state = "pending";
    value = null;
    constructor(fn) {
        fn(this._resolve.bind(this), this._reject.bind(this));
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
    _reject(error) {
        this.state = 'rejected';
        this.value = error;
        this.callback.forEach(callback => this._handle(callback));
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
    then(onFulfilled, onRejected) {
        return new Promise((resolve, reject)=> {
            this._handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            });
        });
    }
    catch(onError) {
        return this.then(null, onError);
    }
    _handle(callback) {
        if (this.state === "pending") {
            this.callbacks.push(callback);
            return ;
        }
        let cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
        if (!cb) { // 如果 then 中没有传递任何东西
            cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(this.value);
            return ;
        }
        try {
            ret = cb(this.value);
            cb = this.state === 'fulfilled' ? callback.resolve : callback.reject;
        } catch (error) {
            ret = error;
            cb = callback.reject;
        } finally {
            cb(ret);
        }
    }
}