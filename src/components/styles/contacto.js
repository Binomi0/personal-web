import styled from 'styled-components';

export const ContactoStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 900;
  text-decoration: none;

  a {
    color: #61dafb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
