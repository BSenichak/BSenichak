import {
    styled,
    Box,
    Container,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Send } from "@mui/icons-material";

const ContuctUs = () => {
    let { t } = useTranslation();
    return (
        <Wrapper>
            <BG />
            <MyContainer>
                <TitleBar>
                    <Title variant="h3">{t("contuct.title")}</Title>
                    <Typography variant="h6">
                        {t("contuct.description")}
                    </Typography>
                </TitleBar>
                <Form>
                    <Typography
                        variant="h3"
                        sx={{
                            color: "primary.main",
                            gridColumn: "1/-1",
                            textAlign: "center",
                            marginBottom: "2rem",
                            border: "2px solid",
                            borderRadius: "1rem 0 1rem 0",
                            justifySelf: "center",
                            padding: "0 3rem",
                        }}
                    >
                        {t("contuct.text")}
                    </Typography>
                    <TextField label={t("contuct.name")} required />
                    <TextField
                        label={t("contuct.email")}
                        type="email"
                        required
                    />
                    <TextField
                        label={t("contuct.message")}
                        multiline
                        rows={5}
                        sx={{ gridColumn: "1/-1" }}
                        required
                    />
                    <Button
                        variant="contained"
                        sx={{ gridColumn: "1/-1" }}
                        endIcon={<Send />}
                    >
                        {t("contuct.send")}
                    </Button>
                </Form>
            </MyContainer>
        </Wrapper>
    );
};

export default ContuctUs;

let Wrapper = styled(Box)`
    height: 100vh;
    position: relative;
`;

let MyContainer = styled(Container)`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 100px 400px 50px;
    padding: 5rem;
    gap: 3rem;
    align-content: center;
    color: ${({ theme }) => theme.palette.text.primary};
    height: 100%;
`;

let BG = styled(Box)`
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: url("./mountain.jpg");
    background-clip: initial;
    background-size: cover;
    opacity: 0.3;
    filter: grayscale(70%)
        ${({ theme }) => (theme.palette.mode == "dark" ? "" : "invert()")};
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

let Form = styled("form")`
    margin-top: 3rem;
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1rem;
`;
