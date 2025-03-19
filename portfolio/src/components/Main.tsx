import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Container,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Typography,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
    Email,
    LocationOn,
    WorkHistory,
    Language,
    Download,
} from "@mui/icons-material";
import { FaReact } from "react-icons/fa";
import { BiLogoTypescript, BiLogoJavascript } from "react-icons/bi";
import {
    SiExpress,
    SiMui,
    SiMysql,
    SiMongodb,
    SiBootstrap,
} from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";

function Main() {
    let { t } = useTranslation();
    let theme = useTheme();
    return (
        <MyContainer>
            <Title>{t("main.title")}</Title>
            <MyProfileCard>
                <CardHeader
                    sx={{ pb: 0 }}
                    avatar={<Avatar src={"ava.jpg"} />}
                    title={
                        <Typography variant="h5">
                            {t("main.fullname")}
                        </Typography>
                    }
                    subheader={t("main.description3")}
                />
                <CardContent sx={{ padding: 0 }}>
                    <List>
                        <ListItemButton>
                            <ListItemIcon>
                                <Email color="primary" />
                            </ListItemIcon>
                            <ListItemText>{t("main.email")}</ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocationOn color="primary" />
                            </ListItemIcon>
                            <ListItemText>{t("main.location")}</ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <WorkHistory color="primary" />
                            </ListItemIcon>
                            <ListItemText>{t("main.workTime")}</ListItemText>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <Language color="primary" />
                            </ListItemIcon>
                            <ListItemText>{t("main.website")}</ListItemText>
                        </ListItemButton>
                    </List>
                </CardContent>
                <Chips>
                    <Chip label="React" icon={<FaReact color="primary" />} />
                    <Chip
                        label="TypeScript"
                        icon={<BiLogoTypescript color="primary" />}
                    />
                    <Chip
                        label="JavaScript"
                        icon={<BiLogoJavascript color="primary" />}
                    />
                    <Chip
                        label="ExpressJS"
                        icon={<SiExpress color="primary" />}
                    />
                    <Chip
                        label="NodeJS"
                        icon={<IoLogoNodejs color="primary" />}
                    />
                    <Chip label="MaterialUI" icon={<SiMui color="primary" />} />
                    <Chip label="MySQL" icon={<SiMysql color="primary" />} />
                    <Chip
                        label="MongoDB"
                        icon={<SiMongodb color="primary" />}
                    />
                    <Chip
                        label="Bootstrap"
                        icon={<SiBootstrap color="primary" />}
                    />
                </Chips>
                <CardActions>
                    <Button
                        variant="outlined"
                        href={"https://t.me/Artur_Demidov"}
                        fullWidth
                        endIcon={<Download />}
                    >
                        {t("main.downloadCV")}
                    </Button>
                </CardActions>
            </MyProfileCard>
            <BanerWrapper>
                <div>
                    <Description sx={{ padding: "1rem 0rem" }} variant="h2">
                        <div
                            style={{
                                position: "relative",
                                width: "fit-content",
                            }}
                        >
                            <Tag sx={{ top: -30, left: -30 }}>&lt;h1&gt;</Tag>
                            {t("main.description1")}
                        </div>
                        <div>
                            {t("main.description2")}{" "}
                            <span style={{ color: theme.palette.primary.main }}>
                                {t("main.description2_1")}
                            </span>
                        </div>
                        <div
                            style={{
                                position: "relative",
                                width: "fit-content",
                            }}
                        >
                            {t("main.description3")}
                            <Tag sx={{ bottom: 10, right: -60 }}>
                                &lt;/h1&gt;
                            </Tag>
                        </div>
                    </Description>
                    <Description
                        sx={{ padding: "3rem 0rem", width: "85%" }}
                        variant="h5"
                    >
                        <span
                            style={{
                                position: "relative",
                                width: "fit-content",
                            }}
                        >
                            <Tag sx={{ top: -30, left: -30 }}>&lt;p&gt;</Tag>
                            {t("main.description4")}
                            <Tag sx={{ bottom: -30, left: -30 }}>&lt;/p&gt;</Tag>
                        </span>
                    </Description>
                    <ContactUs variant="h3">
                        <ContactMeText>{t("main.description5")}</ContactMeText>
                        <IconButton
                            size="large"
                            sx={{ background: theme.palette.background.paper }}
                        >
                            <Email />
                        </IconButton>
                    </ContactUs>
                </div>
            </BanerWrapper>
        </MyContainer>
    );
}

export default Main;

let MyContainer = styled(Container)`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr 5fr 2fr;
    min-height: 90vh;
`;

let Title = styled(Typography)`
    font-size: 4rem;
    color: ${({ theme }) => theme.palette.primary.main};
    grid-column: 1/-1;
    text-align: center;
    text-transform: uppercase;
`;

let MyProfileCard = styled(Card)`
    grid-column: 1/ 5;
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 1rem;
`;

let BanerWrapper = styled(Box)`
    grid-column: 6/-1;
    padding: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.palette.text.primary};
    display: flex;
    justify-content: center;
    align-items: center;
`;

let Tag = styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    position: absolute;
    font-size: ${({ theme }) => theme.typography.h6.fontSize};
`;

let Description = styled(Typography)`
    color: ${({ theme }) => theme.palette.text.primary};
    position: relative;
`;

let ContactMeText = styled(Box)`
    color: ${({ theme }) => theme.palette.primary.main};
`;

let ContactUs = styled(Typography)`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

let Chips = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 0.3rem;
    justify-content: flex-start;
    align-content: center;
    padding: 0 0.5rem 1rem;
    & svg {
        color: ${({ theme }) => theme.palette.primary.main};
        font-size: 1.2rem;
    }
    & > div {
        flex-grow: 1;
    }
`;
