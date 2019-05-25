import styled from 'styled-components';

export const MainLayoutStyled = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .App-Home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    background-color: #282c34;
    font-size: calc(10px + 2vmin);
    color: white;

    h4 {
      color: #61dafb;
      text-shadow: 1px 1px #2b6474;
      font-weight: 100;
      font-size: 1.7rem;

      @media (max-width: 768px) {
        font-size: 1.6rem;
      }
    }

    p {
      color: #ccc;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.45rem;
      font-weight: 600;
    }
  }
  footer {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;
