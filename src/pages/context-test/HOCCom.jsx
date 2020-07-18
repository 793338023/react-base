import React, { Component } from "react";
import { Consumer } from "./AppContext";

function connect(mapDispatchToProps) {
  return (Comp) => {
    return class Connect extends Component {
      getPropsComponent = (ctx) => {
        const state = ctx.state;
        const dispatch = (p) => {
          ctx.dispatch(p);
          this.forceUpdate();
        };
        const mProps = mapDispatchToProps(dispatch);
        const nextProps = { ...this.props, ...state, ...mProps };

        return <Comp {...nextProps} />;
      };

      render() {
        return <Consumer>{this.getPropsComponent}</Consumer>;
      }
    };
  };
}

export default connect;
