import styled from 'styled-components';

export default (theme) => ({
  card: {
    minWidth: 275,
    background: '#8ee7ff',
    '@media (max-width: 960px)': {
      marginBottom: '1rem',
      marginRight: 0,
    },
    '&:last-child': {
      marginRight: 0,
    },
    marginRight: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    '&span': {
      '.change': {
        color: 'white',
      },
    },
  },
  pos: {
    marginBottom: 0,
  },
});

export const CardsContainer = styled.div`
  @media (min-width: 960px) {
    display: flex;
    justify-content: space-between;
  }
  margin: 1rem 0;
`;

export const GraphContent = styled.div`
  padding: 1rem 0;
`;

export const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
