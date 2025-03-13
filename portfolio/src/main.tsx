import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./store/store.ts";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./styles/muiThemes.ts";
import "./i18n.ts";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <Main />
    </Provider>
);

function Main() {
    let theme: string = useSelector((state: RootState) => state.root.theme);
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    );
}
