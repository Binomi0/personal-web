import React, { useState } from 'react';
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

const Modals = ({
  type,
  open,
  closeModal,
  onExitPosition,
  onSelectMarket,
  selectedMarket,
  openModal,
  onOpenPosition,
  ...other
}) => {
  const [modalType, useModalType] = useState('');

  console.log('other', other);

  if (type !== modalType) {
    useModalType(type);
  }
  return (
    <>
      {modalType === MODAL_TYPES.SELECT_MARKET && (
        <SelectMarket
          open={open}
          openModal={openModal}
          closeModal={closeModal}
          onSelectMarket={onSelectMarket}
        />
      )}
      {modalType === MODAL_TYPES.NEW_TRADE && (
        <NewTrade
          open={open}
          closeModal={closeModal}
          onOpenPosition={onOpenPosition}
          selectedMarket={selectedMarket}
        />
      )}
      {modalType === MODAL_TYPES.EXIT_POSITION && (
        <ExitPosition
          open={open}
          closeModal={closeModal}
          onExitPosition={onExitPosition}
          selectedMarket={selectedMarket}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ modal, trading: { positions } }) => ({
  open: modal.open,
  type: modal.type,
  selectedMarket: positions.selectedMarket,
});

const mapDispatchToProps = { ...modalActions, ...positionActions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modals);
