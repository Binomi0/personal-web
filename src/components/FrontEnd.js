import React, { Component } from 'react';

export default class Frontend extends Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
