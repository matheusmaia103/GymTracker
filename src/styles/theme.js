import { blue, orange, yellow } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: blue,
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: '48px',
          height: '48px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '5px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '14px 25px !important',
          margin: '7px',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        containedPrimary: {
          border: '1px solid black',
          borderRadius: '10px',
          ':hover': {
            color: 'white',
          },
        },
      },
    },
  },
});

export default theme;
