import React, { Component } from "react";
import { Provider, store } from "./AppContext"; //引⼊Context的Provider;
import Layout from "./Layout";
import "./index.css";

export default class ContextTest extends Component {
  render() {
    return (
      <Provider value={store}>
        <div>123</div>
        <Layout />
      </Provider>
    );
  }
}
