import {
    styled,
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    useTheme,
} from "@mui/material";
import { t } from "i18next";

const AboutMe = () => {
    let theme = useTheme();
    return (
        <Wrapper>
            <BG />
            <MyContainer>
                <Card sx={{ gridColumn: "1/5" }}>
                    <CardContent>
                        <Typography
                            variant="h3"
                            sx={{ color: "primary.main", textAlign: "center" }}
                        >
                            About Me
                        </Typography>
                    </CardContent>
                </Card>
                <Img>
                    <img src="react.gif" />
                </Img>
                <Card
                    sx={{
                        gridColumn: "1/8",
                        gridRow: "2/3",
                        alignSelf: "start",
                    }}
                >
                    <CardContent>
                        <Tag variant="body1">&lt;p&gt;</Tag>
                        <Box sx={{ padding: "0 1rem" }}>
                            <Typography variant="h3" color="primary">
                                Hello
                            </Typography>
                            <Typography variant="body1">
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
        </Wrapper>
    );
};

export default AboutMe;

let Wrapper = styled(Box)`
    height: 100vh;
    position: relative;
`;

let BG = styled(Box)`
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: url("./aboutBg.png");
    background-clip: initial;
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
`;

let Tag = styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
`;
