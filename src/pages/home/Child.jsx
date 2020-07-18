import React, { Component } from "react";

export default class Child extends Component {
  handleDeal = () => {
    this.props.handleParams("child传递来的信息");
  };
  render() {
    return <div onClick={this.handleDeal}>传递父</div>;
  }
}
