import React, { Component } from 'react';
import { ContactoStyled } from './styles/contacto';

export default class Contacto extends Component {
  render() {
    return (
      <ContactoStyled>
        <a href="mailto:adolfo@onrubia.es">Contacto</a>
      </ContactoStyled>
    );
  }
}
