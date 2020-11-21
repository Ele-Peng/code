/**
 * 将一个元素 element 及其 子元素 children 
 * 呈现给 DOM (parentDom.appendChild(dom))
 * @param {*} element 
 * @param {*} parentDom 
 */
function render(element, parentDom) {
  const { type, props } = element;

  /** create dom element **/
  const isTextElement = type === "TEXT ELEMENT"; // 文本类型判定
  const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

  /** 添加监听器 **/
  // 是否以 on 开头
  const isListener = name => name.startsWith("on");
  // 每一个以 on 开头的属性对应函数props[name] ==> 用 dom-addEvent 连接
  Object.keys(props).filter(isListener).forEach(name => {
    const eventType = name.toLowerCase().substring(2); // 去头两位小谢
    dom.addEventListener(eventType, props[name]);
  })

  /** 添加属性 **/
  // 不是-监听事件 和 不能是 孩子节点
  const isAttribute = name => !isListener(name) && name !== "children";
  // 依据上面方法过滤出来的属性 赋予 dom
  Object.keys(props).filter(isAttribute).forEach(name => {
    dom[name] = props[name];
  })

  /** render children **/
  const childElements = props.children || [];
  childElements.forEach(childElement => render(childElement, dom)); // 将孩子节点递归添加到 parentDom

  /** append child to parent **/  
  parentDom.appendChild(dom);
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