import React from 'react';
import PropTypes from 'prop-types';

import { CardsContainer } from '../styles/balanceCards';
import BalanceCard from './BalanceCard';
import { MARKETS } from '../../../../../modules/constants';

function BalanceCards({ equity, prices, openModal, onSelectMarket, ...rest }) {
  // console.log('rest', rest);
  // console.log('spread', spread);
  // console.log('equity', equity);
  return (
    <CardsContainer>
      <BalanceCard
        equity={equity[MARKETS.IG.DOW]}
        title="Indice"
        prices={prices}
        openModal={openModal}
        onSelectMarket={onSelectMarket}
        market={MARKETS.DOW}
      />
      <BalanceCard
        equity={equity[MARKETS.IG.DAX]}
        title="Indice"
        prices={prices}
        openModal={openModal}
        onSelectMarket={onSelectMarket}
        market={MARKETS.DAX}
      />
      <BalanceCard
        equity={equity[MARKETS.ETH]}
        title="Crypto"
        prices={prices}
        openModal={openModal}
        onSelectMarket={onSelectMarket}
        market="ETH"
      />
    </CardsContainer>
  );
}

BalanceCard.propTypes = {
  equity: PropTypes.object,
};

export default BalanceCards;
