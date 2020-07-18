import React, { Component } from "react";
import Test from "./Test";
import Search from "./Search";
import Child from "./Child";

export default class Home extends Component {
  state = {
    msg: "父自己的信息",
    obj: {
      num: -1,
    },
  };

  click = () => {
    const { obj } = this.state;
    obj.num++;
    this.setState(
      {
        obj: { num: obj.num },
      },
      () => {
        console.log(obj);
      }
    );
  };

  handleParams = (p) => {
    this.setState({ msg: p });
  };
  render() {
    const { obj, msg } = this.state;
    let a = "11";
    return (
      <div>
        <div>
          12
          {a}
        </div>
        <button onClick={this.click}>click</button>
        <Test obj={obj} />
        <Search />
        <hr />
        <Child handleParams={this.handleParams} />
        <div>{msg}</div>
      </div>
    );
  }
}
