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

    // this.authenticate();
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

      console.log('Autenticación con la API de IG realizada correctamente');
      // this.getMarketPrice('IX.D.DOW.IFS.IP');
    } catch (err) {
      console.error('IGService authenticate() =>', err);
    }
    return true;
  }

  createConnection() {
    // console.log('this', this);
    if (!this.identifier || !this.password) {
      console.log('No tengo autenticación');
    }
    this.lsClient.connectionDetails.setUser(this.identifier);
    this.lsClient.connectionDetails.setPassword(this.password);
    this.lsClient.connect();

    this.lsClient.addListener({
      onListenStart() {
        console.groupCollapsed('LightStream');
        console.log('Listen start');
      },
      onStatusChange(newStatus) {
        console.log('newStatus', newStatus);
      },
      onServerError(errCode, errMessage) {
        console.log(errCode);
        console.log(errMessage);
      },
    });
  }

  addSubscription(market, callback) {
    this.mySubscription = new ls.Subscription(
      'MERGE',
      [`MARKET:${market}`],
      ['BID', 'OFFER', 'MARKET_STATE', 'MARKET_DELAY'],
    );
    this.mySubscription.setDataAdapter();
    this.mySubscription.setRequestedSnapshot('yes');

    this.mySubscription.addListener({
      onSubscription() {
        console.log('SUBSCRIBED TO =>', market);
        console.groupEnd();
        console.markTimeline('LightStream');
      },
      onSubscriptionError(code, message) {
        console.log('Error code: ', code, ', message: ', message);
      },
      onUnsubscription() {
        console.log('UNSUBSCRIBED');
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

    this.lsClient.subscribe(this.mySubscription);
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
