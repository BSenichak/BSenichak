import {
    styled,
    Box,
    Container,
    Typography,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    useMediaQuery,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    EffectCards,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getAllWorks, Work } from "../store/firebaseReducer";

const Works = () => {
    let { t } = useTranslation();
    let isTablet = useMediaQuery("(max-width: 768px)");
    let ref = useRef(document.querySelector("#root"));
    let dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAllWorks());
    }, []);
    let works: Work[] = useSelector<RootState, Work[]>(
        (state) => state.fb.works
    );
    return (
        <Wrapper>
            <BG />
            <MyContainer>
                <TitleBar>
                    <Title variant="h3">{t("works.title")}</Title>
                    <Typography
                        variant={isTablet ? "body1" : "h6"}
                        textAlign={"center"}
                    >
                        {t("works.description")}
                    </Typography>
                </TitleBar>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        gridColumn: "1/-1",
                        alignSelf: "stretch",
                        marginTop: "3rem",
                    }}
                >
                    <motion.div
                        viewport={{ root: ref }}
                        initial={{ transform: "scale(0.5)", opacity: 0 }}
                        whileInView={{ transform: "scale(1)", opacity: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <MySwiper
                            modules={[
                                Navigation,
                                Pagination,
                                Scrollbar,
                                A11y,
                                EffectCards,
                            ]}
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation={true}
                            pagination={{ clickable: true }}
                            effect="cards"
                        >
                            {works &&
                                works.map((slide, index) => (
                                    <SwiperSlide
                                        key={index}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        >
                                            <CardHeader
                                                title={slide.title}
                                                subheader={slide.subtitle}
                                                titleTypographyProps={{
                                                    variant: isTablet
                                                        ? "body1"
                                                        : "h5",
                                                }}
                                                subheaderTypographyProps={{
                                                    variant: "body2",
                                                }}
                                            />
                                            <CardMedia
                                                component="img"
                                                height={200}
                                                src={slide.img}
                                                alt="Card image"
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {slide.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </SwiperSlide>
                                ))}
                        </MySwiper>
                    </motion.div>
                </Box>
            </MyContainer>
        </Wrapper>
    );
};

export default Works;

let Wrapper = styled(Box)`
    height: 100vh;
    position: relative;
    scroll-snap-align: start;
`;

let BG = styled(Box)`
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image: url("./WorksBg.jpg");
    background-clip: initial;
    background-size: cover;
    opacity: 0.3;
    filter: grayscale(70%)
        ${({ theme }) => (theme.palette.mode == "dark" ? "" : "invert()")};
`;

let MyContainer = styled(Container)`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr 3fr;
    align-items: center;
    padding: 5rem;
    gap: 1rem;
    align-content: center;
    color: ${({ theme }) => theme.palette.text.primary};
    height: 100%;
    @media (max-width: 768px) {
        padding: 1rem 1rem 5rem;
        grid-template-rows: 100px 1fr;
        align-content: center;
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

let MySwiper = styled(Swiper)`
    width: 100%;
    height: 100%;
    --swiper-theme-color: ${({ theme }) => theme.palette.primary.main};
    max-width: 500px;
`;
