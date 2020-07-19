## React 核心

而前三个就可以实现一个简单版 React，最后一个 Fiber 为 React 核心数据结构

- React.createElement：创建虚拟 DOM
- React.Component：实现⾃定义组件
- ReactDOM.render：渲染真实 DOM
- Fiber 核心数据结构

## createElement

React 会把 jsx 语法经过 babel 转译成 React.createElement，所以当使用 jsx 时识别到的标签都会转译。
如:

jsx

```js
const App = <div>123</div>;
```

转译后

```js
const App = React.createElement(
  "div",
  {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 13,
    },
  },
  "123"
);

// __source,__self 属性是开发环境时调式使用的，在生成环境时不会存在。
```

#### createElement 参数

- 第一参数为标签名，如果是自定标签，那么就是组件的变量如

```js
const Test = React.createElement(App, {}, "xxx");
```

- 第二参数为标签上的属性，如

```js
const Test = <App name="10">xxx</App>;
//转换后
const Test = React.createElement(App, { name: "10" }, "xxx");
```

- 第三个之后包括第三个，都是 chlidren

```js
const Test = (
  <div>
    <div>123</div>
    <App name="10" />
  </div>
);
//转换后
const Test = React.createElement(
  "div",
  {},
  React.createElement("div", {}, "123"),
  React.createElement(App, { name: "10" })
);
```

render 会根据 createElement 返回的数据结构(虚拟 DOM)遍历生成真实 DOM 节点，而自定义标签组件会根据是否为 class 组件或函数组件获取 createElement 返回的数据结构，而函数组件的当前函数就是 jsx 数据，而 class 组件是从 render 方法上获取 jsx 数据。

## Component

我们写 class 组件，都需要继承 React.Component，而 Component 主要是包含了一个 class 需要属性与方法

方法有:

1. setState
2. forceUpdate

而这两个方法的目的都是更新 state 的，只是一个正常的更新 state 数据，setState 会被 shouldComponentUpdate 优化更新拦截更新视图，而 forceUpdate 则不会，因为它是直接跳过更新视图的，所以当我们的数据没有走 setState 更新 state 时，而是直接更新 state 或自己定义的状态对象那么可以使用 forceUpdate 直接渲染视图达到更新视图的效果，如 antd 的 form 就是使用 forceUpdate 更新数据的，由于无法使用 shouldComponentUpdate 优化，表单过大的渲染量大导致操作一项更新所有表单项很消耗性能，会出现卡顿的现象。

属性有:

1. props
2. context
3. refs
4. updater

props 与 context 略过，就是状态

refs 是 class 组件上的让我们存储组件上 ref 值的

updater 才是重点，因为状态的更新就在这里实现，每个组件都有一个更新对象，而里面只实现了更新需要的方法，真正需要更新的数据都存储在 fiber 里面

那么我们在写组件时就会带上默认的属性与方法

## render

render 用于将 React 渲染的虚拟 DOM 渲染到浏览器 DOM，一般在顶层组件使用。该方法把元素挂载到 container 中，并且返回 element 的实例（即 refs 引用），如果是函数组件，render 会返回 null。当组件装载完毕时，callback 就会被调用。其语法为：

```js
ReactDOM.render(ReactElement element,DOMElement container,[function callback])
```

React diff 三大策略

1. 策略一（tree diff）：Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。（DOM 结构发生改变-----直接卸载并重新加载组件）
2. 策略二（component diff）：DOM 结构一样-----不会卸载,但是会 update
3. 策略三（key diff）：比较节点的 key 值，通过 key 来区分重载与更新-----同时遵循 1.2 两点

## Fiber

fiber 其实可以理解为虚拟 DOM，因为 createElement 创建的虚拟 DOM 会对应到 fiber 上，而 DOM 上更新是根据 fiber 的信息，比如 diff 比较。

进行 render 后会把 createElement 的数据转换成 Fiber 数据结构

fiber 最大的好处是可暂定可恢复，让 React 实现让出机制，时间分片，使用的 API requestIdleCallback:

React 已经内部实现了 requestIdleCallback，不使用 requestIdleCallback API

**(React16/fiber)[https://793338023.github.io/2020/04/28/React16-fiber/]**

## js 事件循环机制

我理解的同步异步，是进入主线程的为同步，进行事件队列的为异步，简单的说就是任务在没有进入主线程即为异步

而会进入事件队列里的大概有如下:

1. 浏览器事件：window.load、document.DomContentLoaded 等
2. 网络请求事件:ajax、websocket
3. 用户事件:单双击、鼠标滚动、调整页面大小等
4. 计时器事件：setTimeout,setInterval 等
5. 延迟对象或在某个阶段才触发的浏览器 API，Promise、requestIdleCallback、requestAnimationFrame 等

事件队列分为宏任务的事件队列与微任务的事件队列

宏任务：setTimeout，setInterval，setImmediate，requestAnimationFrame，I / O，UI 呈现，js 初始执行代码等
微任务：Promise，Object.observe，MutationObserver

js 引擎的执行机制是执行把一个宏任务放入主线程上执行，当这个宏任务结束后执行当前的整个微任务队列，然后交出线程让 GUI 渲染线程接管，执行界面上渲染，如解析 DOM 树、css 树之类的，就是做视觉上的工作

而首次执行的代码也是属于宏任务的，所以整个 js 执行机制，可以理解为事件循环机制，但我们不使用会进入事件队列的 API，那么整个代码执行的过程都是在主线程上，因为整个代码都是一个宏任务

而 js 引擎线程与 GUI 渲染线程是互斥的

### 为什么 React 15 会出现卡顿

在 React 没有使用 Fiber 进行重构之前，React 实现的代码是没有使用能进入事件队列的 API 的，所以我们使用 React 实现的功能就是一个宏任务，当这个宏任务代码量与计算量庞大时，就会让 GUI 渲染无法执行，导致到了该渲染时无法渲染。

而 React 重构后加入了时间分片的原理，实现方式是使用了 requestIdleCallback 的原理，React 没有直接使用 requestIdleCallback，因为它有兼容性问题

而我们常说 React 的 setState 使用异步更新，这是因为在代码执行上的效果如异步操作，不会立即更新状态的值，而它的事件原理是进行 setState 时不会立即赋值到 state 上而会进行一轮的状态收集,即进入更新队列里,并且更新队列里的状态改为等待中,当收集完毕后改变状态为完成,并进行 state 更新与 render 渲染内容,但进入事件队列里的方法内的 setState 的状态就无法收集,因为更新流程是在主线程执行的，而事件队列是要等主线程执行完毕后才进行执行的，那么当前的更新队列里的状态已经为完成了,所以异步内的 setState 为同步更新,因为 setState 后获取 state 就是当前的 setState 后的状态,如

```js
state = { a: 0 };

this.setState({ a: 1 });
this.setState({ a: 2 });
class App extends React.Component {
  state = {
    a: 0,
  };

  click = () => {
    this.setState({ a: 1 });
    this.setState({ a: 2 });
    console.log(this.state.a); // 0
    setTimeout(() => {
      this.setState({ a: 3 });
      console.log(this.state.a); // 3
      this.setState({ a: 4 });
      console.log(this.state.a); // 4
    }, 0);
  };

  render() {
    return <div onClick={this.click}>{this.state.a}</div>;
  }
}
```

React 的事件是合成事件，不是原生的事件，内部已经实现了状态更新过程的状态收集
