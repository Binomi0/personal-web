import React from 'react';
import { LoadingBar } from 'react-redux-loading-bar';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Modals from '../routes/Trading/modals';
import LogoAppBar from '../components/LogoAppBar';
import { SubtitleStyled } from './styles';

const MyAppBar = ({ title, subtitle, color, children }) => {
  return (
    <div>
      <LoadingBar showFastActions />
      <Modals />

      <AppBar position="sticky" color={color}>
        <Toolbar>
          <Link to="/">
            <LogoAppBar />
          </Link>
          <Typography variant="h6" color="inherit">
            {title}
            <SubtitleStyled>{subtitle}</SubtitleStyled>
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default MyAppBar;
