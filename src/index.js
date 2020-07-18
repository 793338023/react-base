import React from "react";
import ReactDOM from "react-dom";
import App from "./router";

ReactDOM.render(<App />, document.getElementById("root"));

/**
 * 简单版 React
 */

// import React, { Component } from "./tReact";
// import ReactDOM from "./tReact/ReactDOM";

// function FuncCmp(props) {
//   console.log(props);
//   return <div className="border">name:{props.name}</div>;
// }

// class App extends Component {
//   state = {
//     num: "React ...",
//   };
//   render() {
//     const { num } = this.state;
//     return (
//       <div className="border">
//         <div>{num}</div>
//         <FuncCmp name={"jjc"} />
//       </div>
//     );
//   }
// }

// const app = (
//   <div>
//     <p>222</p>
//     <a href="www.baidu.com">abc</a>
//     <App />
//   </div>
// );

// console.log(app);
// ReactDOM.render(app, document.getElementById("root"));
