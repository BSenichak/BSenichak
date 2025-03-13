import { useTheme } from "@mui/material";
import { Theme as MuiTheme } from "@mui/material/styles";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import Header from "./components/Header";
import { useEffect } from "react";

function App() {
    let theme: MuiTheme = useTheme();
    useEffect(() => {
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);
    // useGSAP(() => {
    //     gsap.fromTo(
    //         "#root",
    //         { backgroundColor: theme.palette.background.default },
    //         {
    //             backgroundColor: theme.palette.secondary.main,
    //             scrollTrigger: {
    //                 trigger: "#root",
    //                 start: "top top",
    //                 end: "bottom bottom",
    //                 scrub: true,
    //             },
    //         }
    //     );
    // });

    return (
        <>
            <Header />
        </>
    );
}

export default App;
