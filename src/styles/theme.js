import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    MuiExpansionPanel: {
      root: {
        '&:first-child': {
          boxShadow: '1px 1px 0px 0px rgba(0,0,0,0.13)',
        },
        '&:last-child': {
          boxShadow: '0px 1px 0px 1px rgba(0,0,0,0.13);',
        },
      },
      expanded: {
        margin: 0,
        boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.33)',
        borderBottom: '1px solid rgba(0,0,0,0.13)',
        '&:last-child': {
          borderBottom: 'none',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#282c33',
        color: '#fff',
        margin: '1px',
      },
      tooltipPlacementBottom: {
        '@media (min-width: 600px)': {
          margin: '2px',
        },
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: 'Rubik-Light, sans-serif',
      },
      body: {
        fontSize: '1rem',
      },
    },
    MuiSelect: {
      root: {
        border: 'none',
        background: '#F7F7F7',
        padding: '0 20px',
        borderRadius: '5px',
        fontFamily: 'Rubik-Light, sans-serif',
        fontSize: '15px',
        display: 'inherit',
      },
      select: {},
      selectMenu: {},
      disabled: {},
      icon: {
        color: '#282c33',
        paddingTop: '10px',
      },
    },
    MuiSvgIcon: {
      root: {
        paddingTop: '3px',
      },
    },
    MuiDialog: {
      root: {
        boxShadow: '0 2px 34px 0 rgba(0,0,0,0.13)',
      },
    },
    MuiButton: {
      root: {
        color: '#fff',
        '&:hover': {
          backgroundColor: '#D8604B',
        },
        boxShadow: 'none',
      },
      containedPrimary: {
        color: '#fff',
        marginRight: '10px',
      },
    },
    MUIDataTableBodyCell: {
      root: {
        textAlign: 'right',
      },
    },
    MUIDataTableHeadRow: {
      root: {
        textAlign: 'right',
      },
    },
    MUIDataTableHeadCell: {
      root: {
        textAlign: 'right',
      },
    },
    MuiTabs: {
      root: {
        background: '#282c33',
      },
    },
    MuiPaper: {
      elevation4: {
        boxShadow: 'none',
        borderBottom: '1px solid #ddd',
      },
      elevation24: {
        boxShadow: '0 2px 34px 0 rgba(0,0,0,0.13)',
      },
      elevation21: {
        boxShadow: '0 2px 34px 0 rgba(0,0,0,0.13)',
      },
      elevation1: {
        //   border: '1px solid rgba(0,0,0,0.13)',
        //   boxShadow: 'none',
        // margin: 0,
        // border: 'none',
      },
    },
    MuiTypography: {
      body1: {
        fontFamily: 'Rubik-Light, sans-serif',
      },
    },
    MuiInputAdornment: {
      root: {
        background: '#eee',
        color: '#eee',
      },
      positionEnd: {
        marginRight: '15px',
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
    },
    MuiTab: {
      root: {
        '@media (min-width: 960px)': {
          minWidth: 0,
        },
        '@media (max-width: 768px)': {
          paddingBottom: '5px',
        },
      },
      label: {
        fontFamily: 'Rubik-Regular, sans-serif',
        fontSize: '15px',
      },
      labelContainer: {
        '@media (min-width: 960px)': {
          padding: '0 12px',
        },
      },
    },
    MuiFab: {
      primary: {
        color: '#fff',
      },
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Rubik-Light',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: '16px',
      fontSmoothing: 'auto',
      fontWeight: 300,
    },
    subtitle1: {
      lineHeight: '1.2rem',
      letterSpacing: '-0.027rem',
      fontWeight: 300,
    },
    subtitle2: {
      // fontFamily: 'Rubik-Regular, sans-serif',
      '-webkit-font-smoothing': 'antialiased',
    },
    body2: {
      fontFamily: 'Rubik-Regular, sans-serif',
      fontSize: '16px',
    },
    h1: {},
    h2: {},
    h3: {
      fontFamily: 'Rubik-Medium, sans-serif',
      fontSize: '16px',
    },
    h4: {},
    h5: {
      fontSize: '28px',
      fontWeight: 300,
    },
    h6: {},
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#282c33',
    },
    secondary: {
      main: '#8ee7ff',
      light: '#ccf2fc',
      contrastText: '#282c33',
    },
    common: {
      black: '#282c33',
      gray: '#8ee7ff',
    },
  },
});
