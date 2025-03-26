import { useTheme } from "@mui/material";
import { Theme as MuiTheme } from "@mui/material/styles";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Main from "./components/Main";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Works from "./components/Works";
import BlogBlock from "./components/BlogBlock";
import ContuctUs from "./components/ContuctUs";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router";
import { motion } from "motion/react";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin/Admin";

function App() {
    let theme: MuiTheme = useTheme();
    let [loaded, setLoaded] = useState(false);
    useEffect(() => {
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);

    useEffect(() => {
        let t = setTimeout(() => setLoaded(true), 2000);
        return () => clearTimeout(t);
    }, []);
    return (
        <>
            {!loaded ? (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: theme.palette.background.default,
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <motion.img
                        src="/1.svg"
                        alt="loading"
                        style={{ width: "50vw", opacity: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 1 }}
                        initial={{ scale: 0 }}
                    />
                </motion.div>
            ) : (
                <>
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Main />
                                    <AboutMe />
                                    <Skills />
                                    <Works />
                                    <BlogBlock />z
                                    <ContuctUs />
                                </>
                            }
                        />
                        <Route path="/adminsss" element={<Admin />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </>
            )}
        </>
    );
}

export default App;
