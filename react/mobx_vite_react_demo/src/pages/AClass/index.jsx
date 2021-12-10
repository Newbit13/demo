import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("counter")
@observer
export default class Index extends Component {
  render() {
    return <div>{this.props.counter.count}</div>;
  }
}
