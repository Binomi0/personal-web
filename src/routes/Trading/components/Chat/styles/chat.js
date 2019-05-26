import styled from 'styled-components';
import { Card } from '@material-ui/core';

export default (theme) => ({
  cardContent: {
    maxHeight: '400px',
    '@media (max-width: 768px)': {
      maxHeight: '200px',
    },
    overflowY: 'auto',
  },
  inputIcon: {
    cursor: 'pointer',
  },
  listItem: {
    background: theme.palette.primary.main,
    marginBottom: '.5rem',
    minHeight: '2rem',
    borderRadius: '.5rem',
  },
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
  name: {
    letterSpacing: '-0.05rem',
  },
  date: {
    letterSpacing: '0.1rem',
    fontSize: '.8rem',
  },
  message: {
    fontSize: '.8rem',
    display: 'flex',
    alignItems: 'center',
  },
  cardIcon: {
    margin: '1rem',
    cursor: 'pointer',
  },
});

export const StyledItems = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.even && 'white'};
`;
export const StyledName = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledChat = styled(Card)``;
