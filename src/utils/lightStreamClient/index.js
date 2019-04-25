// const Promise = require('bluebird');
// const moment = require('moment');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const axios = require('axios');
const ls = require('lightstreamer-client');

const igEndpoint = 'https://demo-apd.marketdatasystems.com';
const IG_API_KEY = 'b33a31199708bd754979bba54c74aaa7f7315431';
const IGUrls = {
  login: 'https://demo-api.ig.com/gateway/deal/session',
  market: 'https://demo-api.ig.com/gateway/deal/markets',
  prices: 'https://demo-api.ig.com/gateway/deal/prices',
};

const IG_USERNAME = 'manhattan';
const IG_PASSWORD = '@Manhattan01';
const identifier = process.env.IG_USERNAME || IG_USERNAME;
const password = process.env.IG_PASSWORD || IG_PASSWORD;
const igAPIKey = process.env.REACT_APP_IG_API_KEY || IG_API_KEY;

const MARKETS = {
  'IX.D.DOW.IFS.IP': 'DOW',
  'IX.D.DAX.IFS.IP': 'DAX',
};

class LightStreamService {
  constructor() {
    this.lsClient = new ls.LightstreamerClient(igEndpoint);

    this.credentials = { identifier, password };
    this.config = {
      headers: {
        'X-IG-API-KEY': igAPIKey,
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
        console.log('Listen start');
      },
      onStatusChange(newStatus) {
        console.log(newStatus);
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
      },
      onSubscriptionError(code, message) {
        console.log('Error code: ', code, ', message: ', message);
      },
      onUnsubscription() {
        console.log('UNSUBSCRIBED');
      },
      onItemUpdate(obj) {
        const marketPrice = {
          [market]: {
            BID: obj.getValue('BID'),
            OFFER: obj.getValue('OFFER'),
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
