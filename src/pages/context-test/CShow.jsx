import React, { Component } from "react";
import connect from "./HOCCom";

class CShow extends Component {
  handleClick = () => {
    const { count } = this.props;
    const nextCount = count + 1;
    this.props.counter(nextCount);
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={this.handleClick}>count</button>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

export default connect((dispatch) => {
  return {
    counter(p) {
      dispatch(p);
    },
  };
})(CShow);
