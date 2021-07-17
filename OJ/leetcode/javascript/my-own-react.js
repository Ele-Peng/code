class component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    // 保留对触发组件实例化的-内部实例的引用，我们需要它能够在公共实例-状态更改时,仅更新实例子树
    updateInstance(this.__internalInstance); // 更新虚拟 dom 树和更新 html
  }
}

/**
 * 构建所谓的-Didact元素 {type, props}, 主要用于-JSx-语法糖-转换
 */
// 我们需要用 createElement 来支持 JSX 
// 函数的第一个参数是type元素的第一个参数，第二个参数是元素的对象props，以及所有下面的参数children。
const TEXT_ELEMENT = "TEXT ELEMENT"; // 类型
function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0; // 是否有孩子？
  const rowChildren = hasChildren ? [].concat(...args) : [];
  
  /** 过滤空值，剩下的不属于 Obejct 的值，createTextElement -> 变为类型为 TEXT_ELEMENT **/
  props.children = rowChildren
    .filter(c => c != null && c !== false)
    .map(c => c instanceof Object ? c : createTextElement(c));
  return { type, props };
}

/**
 * 构建所谓的-文本类型-Didact元素 {type:TEXT_ELEMENT, props} 主要用于-JSx-语法糖-转换
 * 原生 react text
 * const reactElement = {
 *    type: "span",
 *    props: {
 *      children: ["Foo"] // 是孩子, 但也只是一个字符串
 *    }
 *  };
 * 我们需要把它变成
 * const textElement = {
 *     type: "span",
 *     props: {
 *       children: [
 *         {
 *           type: "TEXT ELEMENT", // 1
 *           props: { nodeValue: "Foo" } // 2
 *         }
 *       ]
 *     }
 *   };
 * @param {*} value 
 */
function createTextElement(value) {
  return createElement(TEXT_ELEMENT, {nodeValue: value});
}

/**
 * 渲染-html,带有html元素进场。一切的开头, 接下来对比-虚拟dom树 // -- 1
 * @param {*} element
 * @param {*} container
 */
function render(element, container) {
  const prevInstance = rootInstance; // 虚拟 dom 树主干 === null
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance; // 分支树干
}

/**
 * 需要虚拟dom树 没有？新建！ // -- 2
 * 具有虚拟树后, 且再次触发 , 对比-虚拟dom树, 并加/减/替换/更新dom元素/更新组件元素 // -- 7
 * @param {*} parentDom
 * @param {*} instance
 * @param {*} element
 * @returns
 */
function reconcile(parentDom, instance, element) {
  if (instance === null) {
    // create instance
    // 开始的 虚拟dom树主干 -- null
    const newInstance = instantiate(element); // 从一个 Didact 元素 --> 实例
    parentDom.appendChild(newInstance.dom); // 从 html 元素添加
    return newInstance;
  } else if (element == null) { // childInstances它比nextChildElements长
    // Remove instance
    parentDom.removeChild(instance.dom);
    return null;
  } else if (typeof element.type === "string") {
    // 相同类型
    // Update instance
    // 1. 加入属性
    updateDomProperties(instance.dom, instance.element.props, element.props);
    // 替换新的孩子数组
    instance.childInstances = reconcileChildren(instance, element);

    instance.element = element;
    return instance;
  } else if (instance.element.type !== element.type) {
    // replace instance
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom); 
    return newInstance;
  } else {
    //Update composite instance
    // 更新-组件-

    // parentDom 真实-html-树
    // element Didact元素 新
    // instance  旧
    instance.publicInstance.props = element.props; // 更新 props
    const childElement = instance.publicInstance.render(); // 组件的 render 函数
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement); // 对比剩下孩子
    instance.dom = childInstance.dom; // 更新dom
    instance.childInstance = childInstance; // 更新虚拟 dom 树
    instance.element = element; // 更新 Didact 元素
    return instance;
  }
}

// ----------递归 instantiate 运行一次已上--------------
/**
 * 新建-虚拟-dom-元素/虚拟-组件-元素 // -- 3
 * @param {*} element 
 */
function instantiate(element) {
  const { type, props } = element;
  const isDomElement = typeof type === "string";

  if (isDomElement) {
    /************instantiate dom element****************/
    /** create dom element **/
    const isTextElement = type === "TEXT ELEMENT"; // 文本类型判定
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);
  
    updateDomProperties(dom, [], props);
  
    // -----------dom 构建完成------------
  
    // instantiate and append children
    const childElements = props.children || [];
    // ❗️递归孩子 --> 变 实例数组
    const childInstances = childElements.map(instantiate);
    // 获取 孩子 html 数组
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    // 子节点 加入 父节点， 「html 组合」
    // 正如 2 所做的 递归本函数
    // 所以 孙节点 已经加入 子节点
    childDoms.forEach(childDom => dom.appendChild(childDom));
  
    // dom -> html 元素,
    // element -> Didact 元素
    // childInstances -> 一个包含元素-子元素实例的数组
    const instance = { dom, element, childInstances };
  
    return instance;
  } else {
    // instantiate component element
    // 初始化组件 <App />
    const instance = {};

    // createPublicInstance
    // 新建 newApp = new App()
    // newApp.__internalInstance = instance
    // publicInstance = newApp
    const publicInstance = createPublicInstance(element, instance);
    const childElement = publicInstance.render(); // 自己定义的 render 函数
    const childInstance = instantiate(childElement); // 递归孩子拿到 {dom, element, childInstances}
    const dom = childInstance.dom;

    Object.assign(instance, { dom, element, childInstance, publicInstance }); // 组件元素比 Didact 元素多了 本身实例
    return instance;
  }
}

/**
 * 用于构建-组件元素的新建实例 // -- 4
 *
 * @param {*} element
 * @param {*} internalInstance
 * @returns
 */
function createPublicInstance(element, internalInstance) {
  // 当元素进到这里来，说明
  // type 是一个函数
  const { type, props } = element;
  const publicInstance = new type(props);
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
}


/**
 * 从旧节点中删除所有旧属性，添加所有新属性 // -- 5
 * @param {*} dom 
 * @param {*} prevProps 
 * @param {*} nextProps 
 */
function updateDomProperties(dom, prevProps, nextProps) {
  /** 添加监听器 **/
  // 是否以 on 开头
  const isEvent = name => name.startsWith("on");
  // 不是-监听事件 和 不能是 孩子节点
  const isAttribute = name => !isListener(name) && name !== "children";

  /******  prevProps Remove ******/
  // remove event listeners
  Object.keys(prevProps).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.removeEventListener(eventType, prevProps[name]);
  })
  // remove attributes
  Object.keys(prevProps).filter(isAttribute).forEach(name => {
    dom[name] = null;
  })

  /******  nextProps Add ******/
  // add Event Listeners
  // 每一个以 on 开头的属性对应函数props[name] ==> 用 dom-addEvent 连接
  Object.keys(props).filter(isEvent).forEach(name => {
    const eventType = name.toLowerCase().substring(2); // 去头两位小谢
    dom.addEventListener(eventType, nextProps[name]);
  })

  /** 添加属性 **/
  // 依据上面方法过滤出来的属性 赋予 dom
  Object.keys(props).filter(isAttribute).forEach(name => {
    dom[name] = nextProps[name];
  })
}

/**
 * 用于-this.setState- 中->触发更新虚拟-dom-树 // -- 6
 *
 * @param {*} internalInstance
 */
function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode;
  const element = internalInstance.element;

  reconcile(parentDom, internalInstance, element); // 对比虚拟 dom 树
}

// ----------运行一次开始--------------
let rootInstance = null;

/**
 * reconcileChildren
 * 更新dom元素-子元素 , 递归触发-reconcile // -- 8
 * @param {*} instance 
 * @param {*} element 
 */
function reconcileChildren(instance, element) {
  // instance 旧
  // element 新
  const dom = instance.dom;
  const childInstances = instance.childInstances;
  const nextChildElements = element.props.children || [];
  const newChildInstances = []; // 新的孩子数组

  const count = Math.max(childInstances.length, nextChildElements.length);

  for (let i = 0; i < count; i ++) {
    const childInstance = childInstances[i];
    const childElement = nextChildElements[i];

    // 递归上一层函数 renconcile
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter(instance => instance != null);
}
// ----------运行一次结束--------------