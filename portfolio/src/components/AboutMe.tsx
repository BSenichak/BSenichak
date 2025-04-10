import {
    styled,
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const AboutMe = () => {
    let theme = useTheme();
    let { t } = useTranslation();
    let isTablet = useMediaQuery("(max-width: 768px)");
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        rootRef.current = document.getElementById("root") && null;
    }, []);
    return (
        <Wrapper>
            <BG />
            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.5 }}
                transition={{ type: "spring" }}
                style={{ height: "100%"}}
                viewport={{ root: rootRef }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.5 }}
            >
                <MyContainer>
                    <Card
                        sx={
                            isTablet
                                ? { gridColumn: "1/-1" }
                                : { gridColumn: "1/5" }
                        }
                    >
                        <CardContent>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: "primary.main",
                                    textAlign: "center",
                                }}
                            >
                                {t("about.title")}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Img>
                        <img src="react.gif" />
                    </Img>
                    <Card
                        sx={
                            isTablet
                                ? { gridColumn: "1/-1" }
                                : {
                                      gridColumn: "1/8",
                                      gridRow: "2/3",
                                      alignSelf: "start",
                                  }
                        }
                    >
                        <CardContent>
                            <Tag variant="body1">&lt;p&gt;</Tag>
                            <Box sx={{ padding: "0 1rem" }}>
                                <Typography
                                    variant={isTablet ? "h5" : "h4"}
                                    color="primary"
                                >
                                    Hello
                                </Typography>
                                <Typography
                                    variant={isTablet ? "body1" : "body2"}
                                >
                                    {t("about.description1")}
                                    <span
                                        style={{
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {" "}
                                        {t("about.description2")}{" "}
                                    </span>

                                    {t("about.description3")}
                                    <span
                                        style={{
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {" "}
                                        React, ExpressJS, MySQl{" "}
                                    </span>
                                    {t("about.description4")}
                                    <br />
                                    {t("about.description5")}
                                </Typography>
                            </Box>
                            <Tag variant="body1">&lt;/p&gt;</Tag>
                        </CardContent>
                    </Card>
                </MyContainer>
            </motion.div>
        </Wrapper>
    );
};

export default AboutMe;

let Wrapper = styled(Box)`
    height: 100vh;
    position: relative;
    scroll-snap-align: start;
`;

let BG = styled(Box)`
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: url("./aboutBg.png");
    background-size: cover;
    filter: grayscale()
        ${({ theme }) => (theme.palette.mode == "dark" ? "" : "invert()")};
`;

let MyContainer = styled(Container)`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 100px 400px;
    padding: 5rem;
    gap: 1rem;
    align-content: center;
    color: ${({ theme }) => theme.palette.text.primary};
    height: 100%;
    @media (max-width: 768px) {
        padding: 1rem;
        grid-template-rows: auto;
    }
`;

let Img = styled(Card)`
    grid-column: 9/-1;
    grid-row: 1/3;
    border-radius: 2rem;
    filter: ${({ theme }) => (theme.palette.mode == "dark" ? "invert()" : "")}
        grayscale();
    opacity: 0.8;
    background-color: white;
    box-shadow: none;
    & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

let Tag = styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
`;
