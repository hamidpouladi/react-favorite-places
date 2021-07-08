import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Samim', 'sans-serif'].join(','),
  },
  overrides: {
    MuiDialog: {
      paper: {
        margin: '20px',
      },
    },
  },
});

export default theme;
