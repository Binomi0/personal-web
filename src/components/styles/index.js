import styled from 'styled-components';

export const StyledContent = styled.div`
  margin: 1rem;
  position: absolute;
  top: 0;
  left: 0;

  font-size: 0.9rem;

  p,
  a {
    color: #ccc;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 1rem;
    text-decoration: none;
    letter-spacing: 0.25rem;
    text-shadow: 0.5px 0.5px #255968;
    text-transform: uppercase;

    &:hover {
      color: #61dafb;
      text-decoration: underline;
    }
  }
`;
