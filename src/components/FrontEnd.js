import React, { Component } from 'react';

export default class Frontend extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
