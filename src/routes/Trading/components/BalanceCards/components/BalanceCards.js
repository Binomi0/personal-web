import React from 'react';
import PropTypes from 'prop-types';

import { CardsContainer } from '../styles/balanceCards';
import BalanceCard from './BalanceCard';

function BalanceCards({ spread, equity, ...rest }) {
  return (
    <CardsContainer>
      {equity && equity['IX.D.DOW.IFS.IP'] && spread && (
        <BalanceCard
          equity={equity['IX.D.DOW.IFS.IP']}
          title="Indice"
          spread={spread}
          market="DOW"
          {...rest}
        />
      )}
      {equity && equity['IX.D.DAX.IFS.IP'] && spread && (
        <BalanceCard
          equity={equity['IX.D.DAX.IFS.IP']}
          title="Indice"
          spread={spread}
          market="DAX"
          {...rest}
        />
      )}
      {equity && equity['ETH'] && spread && (
        <BalanceCard
          equity={equity['ETH']}
          quantity={2.27}
          title="Crypto"
          spread={spread}
          market="ETH"
          {...rest}
        />
      )}
    </CardsContainer>
  );
}

BalanceCard.propTypes = {
  equity: PropTypes.object.isRequired,
  spread: PropTypes.object.isRequired,
};

export default BalanceCards;
