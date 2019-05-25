import TradesMoreInfo from './TradesMoreInfo';
import React, { Component } from 'react';

class TradesModals extends Component {
  render() {
    return (
      this.props.modalType === 'TRADES_MORE_INFO' && (
        <TradesMoreInfo {...this.props} />
      )
    );
  }
}

export default TradesModals;
