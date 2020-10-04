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
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        blueGrey: {
            main: '#455a64',
        },
    },
});

export default theme;
