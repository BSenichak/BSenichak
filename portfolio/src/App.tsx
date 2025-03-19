import { useTheme } from "@mui/material";
import { Theme as MuiTheme } from "@mui/material/styles";
import Header from "./components/Header";
import { useEffect } from "react";
import Main from "./components/Main";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Works from "./components/Works";
import BlogBlock from "./components/BlogBlock";
import ContuctUs from "./components/ContuctUs";
import Footer from "./components/Footer";

function App() {
    let theme: MuiTheme = useTheme();
    useEffect(() => {
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);

    return (
        <>
            <Header />
            <Main/>
            <AboutMe/>
            <Skills/>
            <Works/>
            <BlogBlock/>
            <ContuctUs/>
            <Footer/>
        </>
    );
}

export default App;
