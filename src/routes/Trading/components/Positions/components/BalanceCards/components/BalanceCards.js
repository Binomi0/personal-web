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
      {equity && equity[MARKETS.IG.DOW] && (
        <BalanceCard
          equity={equity[MARKETS.IG.DOW]}
          title="Indice"
          prices={prices}
          openModal={openModal}
          onSelectMarket={onSelectMarket}
          market={MARKETS.DOW}
        />
      )}
      {equity && equity[MARKETS.IG.DAX] && (
        <BalanceCard
          equity={equity[MARKETS.IG.DAX]}
          title="Indice"
          prices={prices}
          openModal={openModal}
          onSelectMarket={onSelectMarket}
          market={MARKETS.DAX}
        />
      )}
      {equity && equity[MARKETS.ETH] && (
        <BalanceCard
          equity={equity[MARKETS.ETH]}
          title="Crypto"
          prices={prices}
          openModal={openModal}
          onSelectMarket={onSelectMarket}
          market="ETH"
        />
      )}
    </CardsContainer>
  );
}

BalanceCard.propTypes = {
  equity: PropTypes.object.isRequired,
};

export default BalanceCards;
