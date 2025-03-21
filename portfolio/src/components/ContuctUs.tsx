import {
    styled,
    Box,
    Container,
    Typography,
    TextField,
    Button,
    useMediaQuery,
    Alert,
    Snackbar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Send } from "@mui/icons-material";
import { motion } from "motion/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addMessage, Message, setStatus } from "../store/firebaseReducer";

const ContuctUs = () => {
    let { t } = useTranslation();
    let isTablet = useMediaQuery("(max-width: 768px)");
    let dispatch = useDispatch<AppDispatch>()
    let status = useSelector<RootState, string | null >((state) => state.fb.status);
    let ref = useRef<HTMLDivElement>(document.querySelector("#root"));
    return (
        <Wrapper>
            <BG />
            <MyContainer>
                <motion.div
                    style={{ gridColumn: "1/-1" }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ root: ref }}
                    transition={{ type: "spring" }}
                >
                    <TitleBar>
                        <Title variant="h3">{t("contuct.title")}</Title>
                        <Typography variant="h6" textAlign="center">
                            {t("contuct.description")}
                        </Typography>
                    </TitleBar>
                </motion.div>
                <Form onSubmit={(e : React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    let data = new FormData(e.currentTarget);
                    (e.target as HTMLFormElement).reset()
                    let body: Message = {
                        name: data.get("name") as string || "",
                        email: data.get("email") as string || "",
                        message: data.get("message") as string || "",
                    }
                    dispatch(addMessage(body))
                    
                }}>
                    <motion.div
                        style={{ gridColumn: "1/-1" }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ root: ref }}
                        transition={{ delay: 0.5, type: "spring" }}
                    >
                        <Typography
                            variant={isTablet ? "h5" : "h3"}
                            sx={{
                                color: "primary.main",
                                gridColumn: "1/-1",
                                textAlign: "center",
                                marginBottom: isTablet ? "0.5rem" : "2rem",
                                border: "2px solid",
                                borderRadius: "1rem 0 1rem 0",
                                justifySelf: "center",
                                padding: "0 3rem",
                            }}
                        >
                            {t("contuct.text")}
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ root: ref }}
                        transition={{ delay: 0.6, type: "spring" }}
                    >
                        <TextField
                            label={t("contuct.name")}
                            required
                            name="name"
                            fullWidth
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ root: ref }}
                        transition={{ delay: 0.7, type: "spring" }}
                    >
                        <TextField
                            label={t("contuct.email")}
                            type="email"
                            name="email"
                            required
                            fullWidth
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ root: ref }}
                        transition={{ delay: 0.8, type: "spring" }}
                        style={{ gridColumn: "1/-1" }}
                    >
                        <TextField
                            label={t("contuct.message")}
                            multiline
                            rows={5}
                            required
                            name="message"
                            fullWidth
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ root: ref }}
                        transition={{ delay: 0.9, type: "spring" }}
                        style={{ gridColumn: "1/-1" }}
                    >
                    <Button
                        fullWidth
                        variant="contained"
                        endIcon={<Send />}
                        type="submit"
                    >
                        {t("contuct.send")}
                    </Button>
                    </motion.div>
                </Form>
            </MyContainer>
            <Snackbar open={!!status} autoHideDuration={6000} onClose={() => dispatch(setStatus(null))}>
                <Alert severity="info">{status}</Alert>
            </Snackbar>
        </Wrapper>
    );
};

export default ContuctUs;

let Wrapper = styled(Box)`
    height: 90vh;
    position: relative;
    scroll-snap-align: start;
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
    @media (max-width: 768px) {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
    }
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
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
    }
`;
