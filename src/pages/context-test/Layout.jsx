import React, { Component } from "react";
import CShow from "./CShow";

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        <div>Layout显示</div>
        <hr />
        <CShow lshow={"abc"} />
      </div>
    );
  }
}
