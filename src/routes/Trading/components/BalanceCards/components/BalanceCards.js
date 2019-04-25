import React from 'react';
import PropTypes from 'prop-types';

import { CardsContainer } from '../styles/balanceCards';
import BalanceCard from './BalanceCard';

function BalanceCards({ equity, ...rest }) {
  return (
    <CardsContainer>
      {equity && equity['IX.D.DOW.IFS.IP'] && (
        <BalanceCard
          equity={equity['IX.D.DOW.IFS.IP']}
          title="Indice"
          market="DOW"
          {...rest}
        />
      )}
      {equity && equity['IX.D.DAX.IFS.IP'] && (
        <BalanceCard
          equity={equity['IX.D.DAX.IFS.IP']}
          title="Indice"
          market="DAX"
          {...rest}
        />
      )}
      {equity && equity['ETH'] && (
        <BalanceCard
          equity={equity['ETH']}
          quantity={2.27}
          title="Crypto"
          market="ETH"
          {...rest}
        />
      )}
    </CardsContainer>
  );
}

BalanceCard.propTypes = {
  equity: PropTypes.object,
};

export default BalanceCards;
