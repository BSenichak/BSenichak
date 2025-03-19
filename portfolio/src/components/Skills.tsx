import {
    styled,
    Box,
    Container,
    Typography,
    useTheme,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { SiTypescript, SiMongodb, SiRedux, SiCss3, SiHtml5, SiJavascript, SiReact } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const Skills = () => {
    let theme = useTheme();
    let { t } = useTranslation();
    let isTablet = useMediaQuery("(max-width: 768px)");
    return (
        <Wrapper>
            <BG />
            <MyContainer>
                <TitleBar>
                    <Tag
                        sx={{
                            position: "absolute",
                            top: "-10rem",
                            right: "6rem",
                            fontSize: "10rem",
                            color: theme.palette.primary.main,
                            display: isTablet ? "none" : "block",
                        }}
                    >
                        &lt;/&gt;
                    </Tag>
                    <Title variant={isTablet ? "h4" : "h3"}>{t("skills.title")}</Title>
                    <Typography variant={isTablet ? "body1" : "h6"} textAlign="center">
                        {t("skills.description")}
                    </Typography>
                </TitleBar>
                <SkillGrid>
                    <SkillItem
                        lightcolor="#e54f26"
                        darkcolor="#983419"
                        textcontent="HTML"
                    >
                        <SiHtml5 size={isTablet ? "2rem" : "5rem"} style={isTablet ? { padding: "0.3rem" } : { padding: "1rem" }} />
                    </SkillItem>
                    <SkillItem
                        lightcolor="#0c73b8"
                        darkcolor="#07436b"
                        textcontent="CSS"
                    >
                        <SiCss3 size={isTablet ? "2rem" : "5rem"} style={isTablet ? { padding: "0.3rem" } : { padding: "1rem" }} />
                    </SkillItem>
                    <SkillItem
                        lightcolor="#e7a020"
                        darkcolor="rgb(154, 107, 21)"
                        textcontent="JavaScript"
                    >
                        <SiJavascript size={isTablet ? "2rem" : "5rem"} style={isTablet ? { padding: "0.3rem" } : { padding: "1rem" }} />
                    </SkillItem>
                    <SkillItem
                        lightcolor="#0076c9"
                        darkcolor="#00497c"
                        textcontent="TypeScript"
                    >
                        <SiTypescript size={isTablet ? "2rem" : "5rem"} style={isTablet ? { padding: "0.3rem" } : { padding: "1rem" }} />
                    </SkillItem>
                    <SkillItem
                        lightcolor="#28a9e0"
                        darkcolor="#1a6f93"
                        textcontent="React"
                    >
                        <SiReact size={isTablet ? "2rem" : "5rem"} style={isTablet ? { padding: "0.3rem" } : { padding: "1rem" }} />
                    </SkillItem>
                    <SkillItem
                        lightcolor="#f29418"
                        darkcolor="#a56510"
                        textcontent="MySQL"
                    >
                        <GrMysql size={isTablet ? "2rem" : "5rem"} style={isTablet ? { padding: "0.3rem" } : { padding: "1rem" }} />
                    </SkillItem>
                    <SkillItem
                        lightcolor="#17ad55"
                        darkcolor="#0c602f"
                        textcontent="MongoDB"
                    >
                        <SiMongodb size={isTablet ? "2rem" : "5rem"} style={isTablet ? { padding: "0.3rem" } : { padding: "1rem" }} />
                    </SkillItem>
                    <SkillItem
                        lightcolor="#7a50be"
                        darkcolor="#482f71"
                        textcontent="Redux"
                    >
                        <SiRedux size={isTablet ? "2rem" : "5rem"} style={isTablet ? { padding: "0.3rem" } : { padding: "1rem" }} />
                    </SkillItem>
                </SkillGrid>
            </MyContainer>
        </Wrapper>
    );
};

export default Skills;

let Wrapper = styled(Box)`
    height: 100vh;
    position: relative;
    scroll-snap-align: start;
`;

let BG = styled(Box)`
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: url("./Skills.jpg");
    background-clip: initial;
    background-size: cover;
    opacity: 0.3;
    filter: grayscale(70%)
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
    }
`;

let Tag = styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
`;

let TitleBar = styled(Box)`
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-column: 1/-1;
    position: relative;
`;

let Title = styled(Typography)`
    font-size: 4rem;
    color: ${({ theme }) => theme.palette.primary.main};
    grid-column: 1/-1;
    text-align: center;
    width: fit-content;
    position: relative;

    border-bottom: 2px solid ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 1rem;
    padding: 0 1rem;
    &::after {
        content: "";
        position: absolute;
        bottom: -0.6rem;
        left: 0;
        transform: translateX(-50%);
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: ${({ theme }) => theme.palette.primary.main};
    }
    &::before {
        content: "";
        position: absolute;
        bottom: -0.6rem;
        right: 0;
        transform: translateX(50%);
        width: 15px;
        height: 15px;
        border-radius: 100%;
        background-color: ${({ theme }) => theme.palette.primary.main};
    }
`;

let SkillGrid = styled(Box)`
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: repeat(4, 10rem);
    grid-template-rows: repeat(2, 9rem);
    gap: 1rem;
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-self: end;
    @media (max-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 5rem);
        gap: 2rem;
        align-self: center;
    }
`;

interface SkillItemProps {
    lightcolor: string;
    darkcolor: string;
    textcontent: string;
}

let SkillItem = styled(IconButton)<SkillItemProps>`
    color: #fff;
    background-color: ${({ theme, lightcolor, darkcolor }) =>
        theme.palette.mode == "dark" ? lightcolor : darkcolor};
    position: relative;
    &::after {
        content: ${({ textcontent }) => `"${textcontent}"`};
        position: absolute;
        bottom: -2rem;
        color: ${({ theme, lightcolor, darkcolor }) =>
            theme.palette.mode == "dark" ? lightcolor : darkcolor};
        @media (max-width: 768px) {
            font-size: 0.8rem;
        }
    }

`;
