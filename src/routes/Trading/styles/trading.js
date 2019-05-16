import styled from 'styled-components';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

export default (theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  long: {
    colorPrimary: {
      color: green[500],
    },
  },
  short: {
    colorSecondary: {
      color: red[500],
    },
  },
  checked: {},
  formControl: {
    marginBottom: '.5rem',
  },
  colorSwitchBase: {
    color: 'green',
  },
  colorChecked: {
    color: 'red',
  },
  colorBar: {
    color: 'green',
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
  cell: {
    fontSize: '.8rem',
    fontWeight: 100,
  },
  h1: {
    textTransform: 'uppercase',
    color: theme.palette.secondary.main,
    textShadow: `0.1rem 0.1rem ${theme.palette.primary.light}`,
    '@media (min-width: 960px)': {
      letterSpacing: '0.5rem',
    },
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  h2: {
    // fontWeight: 100,
    color: theme.palette.secondary.main,
    textShadow: `0.05rem 0.05rem ${theme.palette.primary.light}`,
    '@media (max-width: 768px)': {
      margin: 0,
      fontSize: '1rem',
    },
    lineHeight: '1rem',
  },
  titleIcon: {
    marginRight: '.5rem',
  },
});

export const TradingSection = styled.section`
  padding: 1rem;
  border: 1px solid #8ee7ff;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0.01rem #8ee7ff;
  margin: 2rem 0;
  @media (min-width: 768px) {
    margin: 4rem 0;
  }
`;

export const TradingContent = styled.div`
  /* padding: 1rem;
  margin: 4rem 1rem; */
`;

export const TradingViewContainer = styled.div`
  padding: 1rem;
`;

export const ErrorContainer = styled.div`
  height: 200px;
  background: #282c33;
  color: #8ee7ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const TradingBanner = styled.div`
  margin: 2rem 0;
  display: grid;
  /* height: 100%; */
`;

export const Banner = styled.img`
  max-width: 100%;
  max-height: 100vh;
  margin: auto;
`;

export const BoxTitle = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;
