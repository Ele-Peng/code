let uid = 0;

class Dep { // 消息管理员
    constructor() {
        this.id = uid ++; // 设置 id ,用于区分新 watcer 和只改变属性值后新产生的 watcher
        this.subs = []; // 存储订阅者的数组
    }

    // 触发 target 上 watcher 中的 addDep 方法，参数为 dep 的实例本身
    depend() {
        Dep.target.appDep(this);
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify() {
        // 通知所有的订阅者 watcher，触发订阅者的响应逻辑处理
        this.subs.forEach(sub => sub.update());
    }
}

// 为 Dep 类设置一个静态属性，默认为 null, 工作时指向当前的 watcher

Dep.target = null;



class Observer { // 监听者，监听对象属性值的变化
    constructor(value) {
        this.value = value;
        this.walk(value);
    }

    // 遍历属性值并监听
    walk(value) {
        Object.keys(value).forEach(key => this.convert(key, value[key]));
    }

    // 执行监听的具体方法
    convert(key, val) {
        defineReactive(this.value, key, val);
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep;
    // 给当前属性的值添加监听
    let childOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            // 如果 Dep 类存在 target 属性，将其添加到 dep 实例的 subs 数组中
            // target 指向一个 watcher 实例，每个 watcher 都是一个订阅者
            // watcher 实例在实例化过程中，会读取 data 中的某个属性，从而触发 get 方法
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set: (newVal) => {
            if (val === newVal) return ;
            val = newVal;
            // 对新值进行监听
            childOb = observe(newVal);
            // 通知所有订阅者，数值被改变了
            dep.notify();
        }
    })
}


function observe(value) {
    // 当值不存在，或者不是复杂数据类型，不再需要继续深入监听
    if (!value || typeof value !== 'object') {
        return ;
    }
    return new Observer(value);
}


// 订阅者
class Watcher {
    constructor(vm, expOrFn, cb) {
        this.depIds = {}; // hash 值存储订阅者的 id, 避免重复的订阅者
        this.vm = vm; // 被订阅的数据一定来自当前 vue 实例
        this.cb = cb; // 当数据更新时想要做的事情
        this.expOrFn = expOrFn; // 被订阅的数据
        this.val = this.get(); // 维护更新之前的数据
    }

    update() {
        this.run();
    }

    appDep(dep) {
        // 如果在 depIds 的 hash 中没有当前的 id ,可以判断是新 wather ,因此可以添加到 dep 的数组中存储
        // 此判断是避免同 id 的 watcher 被多次存储
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }

    run() {
        const val = this.get();
        console.log(val);
        if (val !== this.val) {
            this.val = val;
            this.cb.call(this.vm, val);
        }
    }

    get() {
        // 当前订阅者 watcher 读取被订阅数据的最新更新后的值时，通知订阅者管理员收集当前订阅者
        Dep.target = this;
        const val = this.vm._data[this.expOrFn];
        // 置空，用于下一个 watcher 使用
        Dep.target = null;
        return val;
    }
}

// 将上述方法挂载到 vue 上
class Vue {
    constructor(options = {}) {
        // 简化了 $options 的处理
        this.$options = options;
        // 简化了对 data 的处理
        let data = (this._data = this.$options.data);
        // 将所有 data 最外层属性代理到 vue 实例上
        Object.keys(data).forEach(key => this._proxy(key));
        // 监听数据
        observe(data);
    }

    $watch(expOrFn, cb) {
        new Watcher(this, expOrFn, cb);
    }

    _proxy(key) {
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get: () => this._data[key],
            set: val => {
                this._data[key] = val;
            }
        })
    }
}