// const Promise = require('bluebird');
// const moment = require('moment');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const axios = require('axios');
const ls = require('lightstreamer-client');

const IGUrls = {
  login: 'https://demo-api.ig.com/gateway/deal/session',
  market: 'https://demo-api.ig.com/gateway/deal/markets',
  prices: 'https://demo-api.ig.com/gateway/deal/prices',
};

function log(message) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message);
  }
}

class LightStreamService {
  constructor() {
    this.lsClient = new ls.LightstreamerClient(
      process.env.REACT_APP_IG_ENDPOINT,
    );
    this.credentials = {
      identifier: process.env.REACT_APP_IG_USERNAME,
      password: process.env.REACT_APP_IG_PASSWORD,
    };
    this.config = {
      headers: {
        'X-IG-API-KEY': process.env.REACT_APP_IG_API_KEY,
        Version: 2,
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    this.identifier = null;
    this.password = '';
    this.prices = {};
    this.accountIdentifier = 100309794;
  }

  async authenticate() {
    try {
      const response = await axios.post(
        IGUrls.login,
        this.credentials,
        this.config,
      );
      this.password = `CST-${response.headers.cst}|XST-${
        response.headers['x-security-token']
      }`;
      this.identifier = response.data.clientId;

      // console.log('Autenticación con la API de IG realizada correctamente');
      // this.getMarketPrice('IX.D.DOW.IFS.IP');
    } catch (err) {
      console.error('IGService authenticate() =>', err);
    }
    return true;
  }

  createConnection() {
    // console.log('this', this);
    if (!this.identifier || !this.password) {
      return;
      // console.log('No tengo autenticación');
    }
    this.lsClient.connectionDetails.setUser(this.identifier);
    this.lsClient.connectionDetails.setPassword(this.password);
    this.lsClient.connect();

    this.lsClient.addListener({
      onListenStart() {
        // console.groupCollapsed('LightStream');
        // console.log('Listen start');
      },
      onStatusChange(newStatus) {
        // console.log('newStatus', newStatus);
      },
      onServerError(errCode, errMessage) {
        console.log(errCode);
        console.log(errMessage);
      },
    });
  }

  addSubscription(market, callback) {
    // this.marketSubscription(market, callback);
    this.marketSubscription = new ls.Subscription(
      'MERGE',
      [`MARKET:${market}`],
      ['BID', 'OFFER', 'MARKET_STATE', 'MARKET_DELAY'],
    );
    this.marketSubscription.setDataAdapter();
    this.marketSubscription.setRequestedSnapshot('yes');

    this.marketSubscription.addListener({
      onSubscription() {
        log('SUBSCRIBED TO =>', market);
        // console.groupEnd();
      },
      onSubscriptionError(code, message) {
        log('Error code: ', code, ', message: ', message);
      },
      onUnsubscription() {
        // console.log('UNSUBSCRIBED');
      },
      onItemUpdate(obj) {
        const BID = parseFloat(obj.getValue('BID'));
        const OFFER = parseFloat(obj.getValue('OFFER'));
        const CURRENT = parseFloat((BID + OFFER) / 2, 10).toFixed(2);
        const marketPrice = {
          [market]: {
            BID,
            OFFER,
            CURRENT,
          },
        };
        // console.log('STREAM OBJ =>', obj);
        // console.log(
        //   `${obj.getValue('MARKET_STATE')}: ${obj.getValue('MARKET_DELAY')}`,
        // );
        // console.log(`${obj.getValue('BID')}: ${obj.getValue('OFFER')}`);
        callback(marketPrice);
      },
    });

    /**
     * ACCOUNT SUBSCRIPTION
     */
    this.accountSubscription = new ls.Subscription(
      'MERGE',
      [`ACCOUNT:${this.accountIdentifier}`],
      ['PNL', 'DEPOSIT', 'AVAILABLE_CASH', 'FUNDS', 'EQUITY'],
    );
    this.accountSubscription.setDataAdapter();
    this.accountSubscription.setRequestedSnapshot('yes');

    this.accountSubscription.addListener({
      onSubscription() {
        log('SUBSCRIBED TO ACCOUNT DATA');
        // console.groupEnd();
      },
      onSubscriptionError(code, message) {
        log('Error code: ', code, ', message: ', message);
      },
      onUnsubscription() {
        // console.log('UNSUBSCRIBED');
      },
      onItemUpdate(obj) {
        const PNL = parseFloat(obj.getValue('PNL'));
        const DEPOSIT = parseFloat(obj.getValue('DEPOSIT'));
        const AVAILABLE_CASH = parseFloat(obj.getValue('AVAILABLE_CASH'));
        const FUNDS = parseFloat(obj.getValue('FUNDS'));
        const EQUITY = parseFloat(obj.getValue('EQUITY'));
        const accountData = {
          PNL,
          DEPOSIT,
          AVAILABLE_CASH,
          FUNDS,
          EQUITY,
        };

        // console.log('accountData', accountData);
        callback(accountData);
      },
    });
    /**
     * CHART SUBSCRIPTION
     */
    this.chartSubscription = new ls.Subscription(
      'DISTINCT',
      [`CHART:${market}:TICK`],
      ['BID', 'OFFER', 'DAY_OPEN_MID', 'DAY_NET_CHG_MID', 'DAY_PERC_CHG_MID'],
    );
    this.chartSubscription.setDataAdapter();
    this.chartSubscription.setRequestedSnapshot('yes');

    this.chartSubscription.addListener({
      onSubscription() {
        log('SUBSCRIBED TO CHART DATA =>', market);
        // console.groupEnd();
      },
      onSubscriptionError(code, message) {
        log('Error code: ', code, ', message: ', message);
      },
      onUnsubscription() {
        // console.log('UNSUBSCRIBED');
      },
      onItemUpdate(obj) {
        const BID = parseFloat(obj.getValue('BID'));
        const OFFER = parseFloat(obj.getValue('OFFER'));
        const DAY_OPEN_MID = parseFloat(obj.getValue('DAY_OPEN_MID'));
        const DAY_NET_CHG_MID = parseFloat(obj.getValue('DAY_NET_CHG_MID'));
        const DAY_PERC_CHG_MID = parseFloat(obj.getValue('DAY_PERC_CHG_MID'));
        const chartData = {
          BID,
          OFFER,
          DAY_OPEN_MID,
          DAY_NET_CHG_MID,
          DAY_PERC_CHG_MID,
        };

        // console.log('chartSubscription', chartData);
        callback(chartData);
      },
    });
    /**
     * CANDLE SUBSCRIPTION
     */
    this.candleSubscription = new ls.Subscription(
      'MERGE',
      [`CHART:${market}:5MINUTE`],
      ['LTP_OPEN', 'LTP_HIGH', 'LTP_LOW', 'LTP_CLOSE', 'CONS_TICK_COUNT'],
    );
    this.candleSubscription.setDataAdapter();
    this.candleSubscription.setRequestedSnapshot('yes');

    this.candleSubscription.addListener({
      onSubscription() {
        log('SUBSCRIBED TO CANDLE DATA =>', market);
        // console.groupEnd();
      },
      onSubscriptionError(code, message) {
        log('Error code: ', code, ', message: ', message);
      },
      onUnsubscription() {
        // console.log('UNSUBSCRIBED');
      },
      onItemUpdate(obj) {
        const LTP_OPEN = parseFloat(obj.getValue('LTP_OPEN'));
        const LTP_HIGH = parseFloat(obj.getValue('LTP_HIGH'));
        const LTP_LOW = parseFloat(obj.getValue('LTP_LOW'));
        const LTP_CLOSE = parseFloat(obj.getValue('LTP_CLOSE'));
        const CONS_TICK_COUNT = parseFloat(obj.getValue('CONS_TICK_COUNT'));
        const candleData = {
          LTP_OPEN,
          LTP_HIGH,
          LTP_LOW,
          LTP_CLOSE,
          CONS_TICK_COUNT,
        };

        // console.log('candleSubscription', candleData);
        callback(candleData);
      },
    });
    this.lsClient.subscribe(this.marketSubscription);
    this.lsClient.subscribe(this.accountSubscription);
    this.lsClient.subscribe(this.chartSubscription);
    this.lsClient.subscribe(this.candleSubscription);
  }

  /**
   *
   * @param {String} recipient Client Name
   */
  throwIfNotFound(user) {
    if (!user) {
      throw new Error('Error al iniciar sesión', 500);
    } else {
      return user;
    }
  }
}

export default LightStreamService;
