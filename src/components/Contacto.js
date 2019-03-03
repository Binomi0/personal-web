import React, { Component } from 'react';
import { ContactoStyled } from './styles/contacto';

export default class Contacto extends Component {
  render() {
    return (
      <ContactoStyled>
        <a className="App-link" href="mailto:adolfo@onrubia.es">
          Contacto
        </a>
      </ContactoStyled>
    );
  }
}
