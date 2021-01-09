import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 380,
            md: 560,
            lg: 768,
            xl: 1024,
        },
    },
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#d50000',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        ratingColor: {
            main: '#FDCC0D',
        },
    },
});

export default theme;
