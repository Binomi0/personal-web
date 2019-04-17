import React from 'react';

import { CardsContainer } from '../styles/balanceCards';
import BalanceCard from './BalanceCards/BalanceCard';

function BalanceCards(props) {
  return (
    <CardsContainer>
      <BalanceCard balance={-100} title="Indice" market="US30" />
      <BalanceCard balance={100} title="Indice" market="DAX" />
      <BalanceCard balance={100} quantity={2.27} title="Crypto" market="ETH" />
    </CardsContainer>
  );
}

export default BalanceCards;
