import {
    styled,
    Box,
    Container,
    Typography,
    Button,
    useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { IoMdLink } from "react-icons/io";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useRef } from "react";

const BlogBlock = () => {
    let { t } = useTranslation();
    let isTablet = useMediaQuery("(max-width: 768px)");
    let ref = useRef<HTMLDivElement>(document.querySelector("#root"));
    return (
        <Wrapper>
            <MyContainer>
                <TitleBar>
                    <Title variant="h3">{t("blogblock.title")}</Title>
                    <Typography variant={isTablet ? "body1" : "h6"}>
                        {t("blogblock.description")}
                    </Typography>
                </TitleBar>
                <motion.div
                    viewport={{ root: ref }}
                    initial={{ height: "0px" }}
                    whileInView={{ height: "auto" }}
                    transition={{ type: "spring", duration: 1 }}
                    style={{ gridColumn: "1/-1", overflow: "hidden", borderTop: "1px solid", borderBottom: "1px solid" }}
                >
                    <NewsBlock>
                        <img src="https://picsum.photos/1000" alt="" />
                        <Typography variant="h4" sx={{ color: "primary.main" }}>
                            lorem ipsum
                        </Typography>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iste impedit maxime necessitatibus excepturi.
                            Fugit harum hic modi ipsum! Ea asperiores sit animi
                            dignissimos ad quidem quaerat minus a? Error
                            expedita maiores deleniti iure fugit dolorem,
                            necessitatibus earum, enim magni similique animi eum
                            nesciunt totam officia, hic saepe repellendus at
                            odit!
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "primary.main" }}
                        >
                            <Link to="/" style={{ color: "inherit" }}>
                                {t("blogblock.morelink")}
                            </Link>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textAlign: "right" }}
                        >
                            15.01.2000
                        </Typography>
                    </NewsBlock>
                </motion.div>
                <Box
                    sx={{
                        gridColumn: "1/-1",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        endIcon={<IoMdLink size={25} />}
                    >
                        {t("blogblock.readmore")}
                    </Button>
                </Box>
            </MyContainer>
        </Wrapper>
    );
};

export default BlogBlock;

let Wrapper = styled(Box)`
    height: 100vh;
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
    align-items: center;
    color: ${({ theme }) => theme.palette.text.primary};
    height: 100%;
    @media (max-width: 768px) {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
    }
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

let NewsBlock = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 4rem 1fr 2rem 2rem;
    padding: 3rem 0;
    padding-right: 3rem;
    & img {
        grid-row: 1/-1;
        grid-column: 1/2;
        object-fit: cover;
        width: 100%;
        height: 100%;
        padding: 0 3rem;
    }

    @media (max-width: 768px) {
        text-align: center;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        & img {
            max-height: 300px;
        }
    }

    @media (max-width: 400px) {
        & img {
            display: none;
        }
    }
`;
