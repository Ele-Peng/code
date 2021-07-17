const createStore = function(reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  function getState() {
    return state;
  }
  /* 注意！！！只修改了这里，用一个不匹配任何计划的 type，来获取初始值 */
  dispatch({ type: Symbol() })

  return {
    getState,
    subscribe,
    changeState
  }
}

// 不允许计划外的 count 修改，我们只允许 count 自增和自减两种改变方式！

// 那我们分两步来解决这个问题

// 1. 制定一个 state 修改计划，告诉 store，我的修改计划是什么。
// 2. 修改 store.changeState 方法，告诉它修改 state 的时候，按照我们的计划修改。
// 我们来设置一个 plan 函数，接收现在的 state，和一个 action，返回经过改变后的新的 state。

/*注意：action = {type:'',other:''}, action 必须有一个 type 属性*/
/*counterReducer, 一个子reducer*/
/*注意：counterReducer 接收的 state 是 state.counter*/
/* counter 自己的 state 和 reducer 写在一起*/
let initState = {
  count: 0
}
function counterReducer(state, action) {
  /*注意：如果 state 没有初始值，那就给他初始值！！*/  
  if (!state) {
      state = initState;
  }
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    default:
      return state;
  }
}

/*InfoReducer，一个子reducer*/
/*注意：InfoReducer 接收的 state 是 state.info*/
function InfoReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}

// 我们用 combineReducers 函数来把多个 reducer 函数合并成一个 reducer 函数。大概这样用
const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});

function combineReducers(reducers) {
  /* reducerKeys = ['counter', 'info']*/
  const reducersKeys = Object.keys(reducers);

  return function combination(state = {}, action) {
    /*生成的新的state*/
    const nextState = {}

    for (let i = 0; i < reducersKeys.length; i ++) {
      const key = reducersKeys[i];
      const reducer = reducers[key];
      /*之前的 key 的 state*/
      const previousStateForKey = state[key];
       /*执行 分 reducer，获得新的state*/
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
    }
  }
}
const applyMiddle = function (...middlewares) {
  return function rewriteCreateStoreFunc(oldCreateStore) {
    return function newCreateStore(reducer, initState) {
      const store = oldCreateStore(reducer, initState);
      const chain = middlewares.map(middleware => middleware(store));
      let dispatch = store.dispatch;
      chain.reverse().map(middleware => {
        dispatch = middleware(dispatch);
      })
      store.dispatch = dispatch;
      return store;
    }
  }
}
let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '前端九部',
    description: '我们都是前端爱好者！'
  }
}

let store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});
/*自增*/
store.dispatch({
  type: 'INCREMENT'
});

/*修改 name*/
store.dispatch({
  type: 'SET_NAME',
  name: '前端九部2号'
});