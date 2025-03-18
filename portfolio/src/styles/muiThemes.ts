import createTheme from "@mui/material/styles/createTheme";
import { Theme as MuiTheme } from "@mui/material/styles";

export const lightTheme: MuiTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#0c5a4f",
        },
        secondary: {
            main: "#005d4b",
        },
        background: {
            default: "#ffffff",
            paper: "#ddd",
        },
    },
    typography: {
        fontFamily: "MyFont, sans-serif",
    },
});

export const darkTheme: MuiTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#292f36",
            paper: "#43454d",
        },
        primary: {
            main: "#12f7d6",
        },
        secondary: {
            main: "#98faec",
        },
    },
    typography: {
        fontFamily: "MyFont, sans-serif",
    },
});

export interface Theme {
    palette: {
        mode: "light" | "dark";
        primary: {
            main: string;
        };
        secondary: {
            main: string;
        };
    };
}
