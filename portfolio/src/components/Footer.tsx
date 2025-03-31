import { Box, Container, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { LinkedIn, GitHub } from "@mui/icons-material";
import { TbBrandFiverr } from "react-icons/tb";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <Wrapper>
            <NavBar>
                <Typography variant="body1">
                    <Link
                        to="/adminsss"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        &copy; {new Date().getFullYear()} {t("footer.title")}
                    </Link>
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
