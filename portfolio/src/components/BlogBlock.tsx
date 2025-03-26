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
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { BlogPost, getRandomBlogPost } from "../store/firebaseReducer";

const BlogBlock = () => {
    let { t } = useTranslation();
    let isTablet = useMediaQuery("(max-width: 768px)");
    let ref = useRef<HTMLDivElement>(document.querySelector("#root"));
    let dispatch = useDispatch<AppDispatch>();
    let randomBlogPost = useSelector<RootState, BlogPost | null>(
        (state) => state.fb.randomBlogPost
    );
    useEffect(() => {
        dispatch(getRandomBlogPost());
    }, []);
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
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ type: "spring", duration: 1 }}
                    style={{
                        gridColumn: "1/-1",
                        overflow: "hidden",
                        borderTop: "1px solid",
                        borderBottom: "1px solid",
                    }}
                >
                    <NewsBlock>
                        <img src={randomBlogPost?.img} alt="" />
                        <Box display={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                            <Typography
                                variant="h4"
                                sx={{ color: "primary.main" }}
                            >
                                {randomBlogPost?.title}
                            </Typography>
                            <Typography variant="body1">
                                {randomBlogPost?.description.slice(0, 300)}
                                ...
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: "primary.main" }}
                            >
                                <Link
                                    to={"/blog?id=" + randomBlogPost?.id}
                                    style={{ color: "inherit" }}
                                >
                                    {t("blogblock.morelink")}
                                </Link>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textAlign: "right" }}
                            >
                                {randomBlogPost?.date}
                            </Typography>
                        </Box>
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
                        component={Link}
                        to="/blog"
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
    /* grid-template-rows: 1fr 1fr 1fr 1fr; */
    max-height: 400px;
    align-items: start;
    gap: 3rem;
    padding: 3rem;
    & img {
        display: block;
        grid-row: 1/-1;
        object-fit: cover;
        width: 100%;
        height: 300px;
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
