/**
 * 将一个元素 element 及其 子元素 children 
 * 呈现给 DOM (parentDom.appendChild(dom))
 * @param {*} element 
 * @param {*} parentDom 
 */
// ----------运行一次开始--------------
let rootInstance = null;

functio render(element, container) {
  const prevInstance = rootInstance; // 虚拟 dom 树主干 === null
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance; // 分支树干
}

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
  } else if (instance.element.type === element.type) {
    // 相同类型
    // Update instance
    // 1. 加入属性
    updateDomProperties(instance.dom, instance.element.props, element.props);
    // 替换新的孩子数组
    instance.childInstances = reconcileChildren(instance, element);

    instance.element = element;
    return instance;
  } else {
    // replace instance
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom); 
    return newInstance;
  }
}

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


// ----------递归 instantiate 运行一次已上--------------
function instantiate(element) {
  const { type, props } = element;

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
}

/**
 * 从旧节点中删除所有旧属性，添加所有新属性
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