import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectMarket from '../modals/SelectMarket';
import NewTrade from '../modals/NewTrade';
import ExitPosition from '../modals/ExitPosition';

import { actions as modalActions } from '../../../reducers/modal';
import { actions as positionActions } from '../components/Positions/modules/positions';

const MODAL_TYPES = {
  SELECT_MARKET: 'SELECT_MARKET',
  NEW_TRADE: 'NEW_TRADE',
  EXIT_POSITION: 'EXIT_POSITION',
};

const Modals = ({ type, onExitPosition, onOpenPosition, ...other }) => {
  const [modalType, useModalType] = useState('');

  if (type !== modalType) {
    useModalType(type);
  }

  return (
    <>
      {modalType === MODAL_TYPES.SELECT_MARKET && <SelectMarket {...other} />}
      {modalType === MODAL_TYPES.NEW_TRADE && (
        <NewTrade {...other} onOpenPosition={onOpenPosition} />
      )}
      {modalType === MODAL_TYPES.EXIT_POSITION && (
        <ExitPosition {...other} onExitPosition={onExitPosition} />
      )}
    </>
  );
};

Modals.propTypes = {
  type: PropTypes.string.isRequired,
  onExitPosition: PropTypes.func.isRequired,
  onOpenPosition: PropTypes.func.isRequired,
};

const mapStateToProps = ({ modal, trading }) => ({
  open: modal.open,
  type: modal.type,
  selectedMarket: trading.positions.selectedMarket,
  positions: trading.positions.open,
  ig: trading.prices.ig,
});

const mapDispatchToProps = { ...modalActions, ...positionActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modals);
