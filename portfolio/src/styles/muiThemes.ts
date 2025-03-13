import createTheme from '@mui/material/styles/createTheme'
import { Theme as MuiTheme } from '@mui/material/styles'

export const lightTheme: MuiTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

export const darkTheme: MuiTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export interface Theme {
    palette: {
        mode: 'light' | 'dark',
        primary: {
            main: string,
        },
        secondary: {
            main: string,
        },
    }
}