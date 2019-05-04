import React from 'react';
import { withStyles, Typography, Link } from '@material-ui/core';

import styled, {
  FooterColumns,
  FooterContainer,
  FooterHeader,
  FooterSocials,
} from './styles';

import logoYouTube from '../assets/img/icono-youtube.png';
import logoTwitter from '../assets/img/icono-twitter.png';
import logoProrealcode from '../assets/img/prorealcode.jpg';

const Footer = ({ classes }) => {
  return (
    <FooterContainer>
      <FooterHeader>&#169; Copyright 2019 | Adolfo Onrubia</FooterHeader>
      <FooterSocials>
        <Link
          to="https://www.youtube.com/channel/UCXA7Xl1fJ8oErsEg0UNUPRQ?view_as=subscriber"
          href="https://www.youtube.com/channel/UCXA7Xl1fJ8oErsEg0UNUPRQ?view_as=subscriber"
        >
          <img src={logoYouTube} alt="logo-youtube" />
        </Link>
        <img src={logoTwitter} alt="logo-twitter" />
        <Link
          to="https://www.prorealcode.com/user/adolfo_onrubia/"
          href="https://www.prorealcode.com/user/adolfo_onrubia/"
          target="_blank"
        >
          <img src={logoProrealcode} alt="logo-prorealcode" />
        </Link>
      </FooterSocials>
      {/* <FooterColumns>
        <div className={classes.footerItem}>
          <Typography color="secondary" variant="h6">
            Enlaces
          </Typography>
          <ul>
            <li>Enlace 1</li>
            <li>Enlace 2</li>
            <li>Enlace 3</li>
            <li>Enlace 4</li>
          </ul>
        </div>
        <div className={classes.footerItem}>
          <ul>
            <li>Enlace 1</li>
            <li>Enlace 2</li>
            <li>Enlace 3</li>
            <li>Enlace 4</li>
          </ul>
        </div>
        <div className={classes.footerItem}>
          <ul>
            <li>Enlace 1</li>
            <li>Enlace 2</li>
            <li>Enlace 3</li>
            <li>Enlace 4</li>
          </ul>
        </div>
      </FooterColumns> */}
    </FooterContainer>
  );
};

export default withStyles(styled)(Footer);
