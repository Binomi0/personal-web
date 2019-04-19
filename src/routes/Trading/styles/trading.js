import styled from 'styled-components';
import blue from '@material-ui/core/colors/blue';

export default (theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  table: {
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  },
  h1: {
    margin: '1rem 0',
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,
    textShadow: `0.1rem 0.1rem ${theme.palette.primary.light}`,
    '@media (min-width: 960px)': {
      letterSpacing: '0.5rem',
    },
  },
  h2: {
    margin: '1rem 0',
    fontWeight: 100,
    color: theme.palette.secondary.main,
    textShadow: `0.05rem 0.05rem ${theme.palette.primary.light}`,
    '@media (max-width: 768px)': {
      margin: 0,
    },
  },
});

export const TradingContent = styled.div`
  margin: 1rem;
`;

export const TradingContainer = styled.div`
  background: #282c33;
`;

export const ErrorContainer = styled.div`
  height: 100vh;
  background: #282c33;
  color: #8ee7ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
