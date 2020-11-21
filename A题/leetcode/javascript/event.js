class EventEmitter {
  constructor() {
    this._events = this._events || new Map(); // 存储事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}


// 触发名为type的事件
EventEmitter.prototype.emit = function (type, ...args) {
  let handler;
  // 从存储事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type); // get callback
  if (Array.isArray(handler)) {
    for (let i = 0; i < handler.length; i ++) { // 如果是一个数组说明有多个监听者，需要依次触发里面的函数
      if (args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].bind(this);
      }
    }
  } else { // 单个函数直接触发
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }
  return true;
};


// 监听名为type的事件
EventEmitter.prototype.addListener = function(type, fn) {
  let handler = this._events.get(type); // 获取对应事件名称的函数清单
  if (!handler) {
    // 将type事件以及对应的fn函数放入this._events中存储
    this._events.set(type, fn);
  } else if (handler && typeof handler === "function") { // 如果handler是一个函数，说明只有一个监听者
    this._events.set(type, [handler, fn]);
  } else { // 已经有多个监听者，那么直接往数组里push函数即可
    handler.push(fn);
  }
}

// 移除事件监听
EventEmitter.prototype.removeListener = function(type, fn) {
  let handler = this._events.get(type);
  if (handler && typeof handler === "function") { // 单个监听事件
    this._events.delete(type);
  } else {
    let position = -1;
    // 如果handler是数组，说明被监听多次要找到对应的函数
    for (let i = 0;i < handler.length; i ++) {
      if (handler[i] === fn) {
        position = i;
      }
    }
    if (position === -1) {
      return this; // 没有符合的监听事件
    } else {
      // 找到数组中对应位置，直接清除此回调
      handler.splice(position, 1);
      if (handler.length === 1) { // 移除监听事件后，监听事件列表长度变为1，那么改为以函数形式保存
        this._events.set(type, handler[0]);
      }
    }
  }
}

/****** test case *******/
// 实例化
const emitter = new EventEmitter;
// 监听名为arson的事件对应一个回调函数
emitter.addListener("arson", man => {
  console.log(`expel ${man}`);
});
// 重复监听 arson
emitter.addListener("arson", man => {
  console.log(`type ${man}`);
});
// 触发arson事件，发现回调成功执行
emitter.emit('arson', 'low-end');