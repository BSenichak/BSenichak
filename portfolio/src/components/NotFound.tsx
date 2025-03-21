import { Container, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

type Props = {};

function NotFound({}: Props) {
    let { t } = useTranslation();
    return (
        <Wrapper>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: "spring" }}
            >
                <Typography variant="h1" textAlign={"center"}>404</Typography>
                <Typography variant="h3">{t("notfound.title")}</Typography>
            </motion.div>
        </Wrapper>
    );
}

export default NotFound;

let Wrapper = styled(Container)`
    min-height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.palette.primary.main};
`;
