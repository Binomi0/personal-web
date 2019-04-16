import styled from 'styled-components';

export default (theme) => ({
  card: {
    minWidth: 275,
    background: '#8ee7ff',
    '@media (max-width: 960px)': {
      marginBottom: '1rem',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const CardsContainer = styled.div`
  @media (min-width: 960px) {
    display: flex;
    justify-content: space-between;
  }
  margin: 1rem 0;
`;
