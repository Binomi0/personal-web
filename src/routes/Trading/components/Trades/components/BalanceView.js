import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import LinearGraph from '../../../../../components/LinearGraph';

// TODO Export to constants
const humanDate = 'DD [de] MMMM [de] YYYY';

class BalanceView extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    accountEquity: PropTypes.oneOfType([PropTypes.number, PropTypes.array])
      .isRequired,
  };

  render() {
    console.log(this.constructor.name, this.props);
    const { classes, equity } = this.props;
    return (
      <div>
        <h2 className={classes.h2}>
          Balance Actual {moment().format(humanDate)}
        </h2>
        <LinearGraph classes={classes} data={equity} />
      </div>
    );
  }
}

const mapStateToProps = ({ trading }) => ({
  equity: trading.trades.equity,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BalanceView);
