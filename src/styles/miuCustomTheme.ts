import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#3f698b',
            dark: '#27567c',
        },
        secondary: {
            main: '#bfe3f5',
            light: '#d0eaf9',
            dark: '#a4cbde',
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        h6: {
            fontSize: '1.25rem',
            '@media (max-width:450px)': {
                fontSize: '1.1rem',
            },
        },
        subtitle2: {
            fontSize: '0.75rem',
        },
        body1: {
            fontSize: '1rem',
            '@media (max-width:450px)': {
                fontSize: '0.9rem',
            },
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});