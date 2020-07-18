import React, { Component } from "react";
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    // this.change = this.change.bind(this);
  }
  btn = () => {
    //使⽤箭头函数，不需要指定回调函数this，且便于传递参数
    console.log("btn");
  };
  change = (e) => {
    let value = e.target.value;
    this.setState({
      name: value,
    });
    console.log("name", this.state.name);
  };
  render() {
    const { name } = this.state;
    return (
      <div>
        <button onClick={this.btn}>按钮</button>
        <input
          type="text"
          placeholder="请输⼊"
          name={name}
          onChange={this.change}
        />
      </div>
    );
  }
}
