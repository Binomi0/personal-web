import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { StyledContent } from './styles';

export default class Menu extends Component {
  render() {
    return (
      <StyledContent>
        <Link to="/trading">Trader</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/frontend">Frontend</Link>
        <Link to="/backend">Backend</Link>
        <Link to="/tools">Tools</Link>
        {/* <FrontEnd>
            <Link to="/frontend">Frontend</Link>
          </FrontEnd>
          <BackEnd>
            <Link to="/backend">Backend</Link>
          </BackEnd>
          <Tools>
            <Link to="/tools">Tools</Link>
          </Tools> */}
      </StyledContent>
    );
  }
}
