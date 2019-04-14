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
});

export const TradingContainer = styled.div`
  background-color: '#282c33';
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

export const PositionContainer = styled.div`
  margin: 1rem;
`;
