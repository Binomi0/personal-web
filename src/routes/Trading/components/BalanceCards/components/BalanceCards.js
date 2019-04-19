import React from 'react';

import { CardsContainer } from '../styles/balanceCards';
import BalanceCard from './BalanceCard';

function BalanceCards({ equity, ...rest }) {
  const position = (market) => {
    if (equity[market]) {
      return equity[market];
    }
    return {};
  };
  return (
    <CardsContainer>
      <BalanceCard
        balance={position('DOW')}
        title="Indice"
        market="DOW"
        {...rest}
      />
      <BalanceCard
        balance={position('DAX')}
        title="Indice"
        market="DAX"
        {...rest}
      />
      <BalanceCard
        balance={position('ETH')}
        quantity={2.27}
        title="Crypto"
        market="ETH"
        {...rest}
      />
    </CardsContainer>
  );
}

export default BalanceCards;
