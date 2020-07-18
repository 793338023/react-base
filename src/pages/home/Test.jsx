import React, { Component } from "react";

export default class Test extends Component {
  state = { num: 0 };
  handleClick = () => {
    const { num } = this.state;

    this.setState({ num: num + 1 });
  };
  render() {
    const { num } = this.state;

    return (
      <div>
        <p>{num}</p>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    );
  }
}
