import {
    Box,
    Container,
    Divider,
    FormControl,
    MenuItem,
    Select,
    styled,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { TbBrandFiverr } from "react-icons/tb";
import ThemeSwitch from "./ThemeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

interface SelectorProps {
    theme: string;
    language: string;
}

export default function Footer() {
    const { t, i18n } = useTranslation();
    let { theme, language }: SelectorProps = useSelector(
        (state: RootState) => state.root
    );
    let dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "root/loadTheme" });
        dispatch({ type: "root/loadLanguage" });
        i18n.changeLanguage(language);
    }, [language]);
    return (
        <Wrapper>
            <NavBar>
                <Typography variant="body1">
                    &copy; {new Date().getFullYear()} BSenichak. All rights
                    reserved
                </Typography>
                <Links>
                    <Link to="/">{t("home.title")}</Link>
                    <Link to="/blog">{t("header.blog")}</Link>
                    <Link
                        to="https://linkedin.com/in/bohdan-senichak-4a7340275"
                        target="_blank"
                    >
                        <LinkedIn />
                    </Link>
                    <Link to="https://github.com/BSenichak" target="_blank">
                        <GitHub />
                    </Link>
                    <Link to="https://www.fiverr.com/s/e65Radk" target="_blank">
                        <TbBrandFiverr />
                    </Link>
                </Links>
            </NavBar>
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    color: ${({ theme }) => theme.palette.text.primary};
    padding: 1rem;
    background-color: transparent;
    background-image: none;
`;

let NavBar = styled(Container)`
    display: flex;
    justify-content: space-between;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
`;

let Links = styled(Box)`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 1rem;
`;

let Link = styled(NavLink)`
    &.active {
        text-decoration: underline;
    }
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    & svg {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.palette.primary.main};
    }
    & span {
        @media (max-width: 850px) {
            display: none;
        }
    }
`;

let Logo = styled("img")`
    height: 2rem;
    color: ${({ theme }) => theme.palette.primary.main};
    @media (max-width: 600px) {
        height: 4rem;
    }
`;

let LogoBar = styled(Box)`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    & h5 {
        @media (max-width: 600px) {
            font-size: 3rem;
        }
    }
`;

let MySelect = styled(Select)`
    background-color: transparent;
    color: inherit;
    & fieldset {
        border-color: transparent;
    }
    & .MuiOutlinedInput-root:hover {
        border: none;
    }
`;
