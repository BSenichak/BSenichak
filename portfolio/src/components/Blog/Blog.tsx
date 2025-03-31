import {
    Container,
    styled,
    Typography,
    CardHeader,
    CardContent,
    CardMedia,
    Card,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    CardActions,
    DialogActions,
    useMediaQuery,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router";
import Masonry from "@mui/lab/Masonry";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getBlogPosts, BlogPost } from "../../store/firebaseReducer";
import CloseIcon from "@mui/icons-material/Close";
import { t } from "i18next";
import { motion } from "motion/react";

export default function Blog() {
    let postId = useSearchParams()[0].get("id");
    let dispatch = useDispatch<AppDispatch>();
    let navigate = useNavigate();
    let posts: BlogPost[] = useSelector(
        (state: RootState) => state.fb.blogPosts
    );
    useEffect(() => {
        dispatch(getBlogPosts());
    }, []);
    let istablet = useMediaQuery("(max-width: 768px)");
    let isMobile = useMediaQuery("(max-width: 600px)");
    return (
        <Wrapper>
            
            <Typography variant="h3" textAlign={"center"} sx={{ marginBottom: "1rem" }}>{t("blog.title")}</Typography>

            <Masonry columns={isMobile ? 1 : istablet ? 2 : 3} spacing={2}>
                {posts.map((post) => {
                    return (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: Math.random(), type: "spring", delay: Math.random() * 0.5 }}
                        >
                        <Card
                            key={post.id}
                            onClick={() => navigate("/blog?id=" + post.id)}
                            sx={{ cursor: "pointer" }}
                        >
                            <CardHeader title={post.title} />
                            <CardMedia image={post.img} component={"img"} />
                            <CardContent>
                                {post.description.slice(0, 200)}
                                {post.description.length > 200 && "..."}
                            </CardContent>
                            <CardActions sx={{ justifyContent: "end" }}>
                                <Typography variant="body2" color="text.secondary">{post.date}</Typography>
                            </CardActions>
                        </Card>
                        </motion.div>
                    );
                })}
            </Masonry>
            <Dialog open={!!postId} onClose={() => navigate("/blog")} scroll="paper">
                <DialogTitle sx={{ position: "relative" }}>
                    {posts.find((post) => post.id === postId)?.title}{" "}
                    <IconButton
                        onClick={() => navigate("/blog")}
                        sx={{
                            position: "absolute",
                            right: "0.2rem",
                            top: "0.2rem",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <MyDialogContent>
                    {posts.find((post) => post.id === postId) && (
                        <PostImg
                            src={posts.find((post) => post.id === postId)?.img}
                            alt=""
                        />
                    )}
                    <Typography variant="body1">{posts.find((post) => post.id === postId)?.description}</Typography>
                </MyDialogContent>
                <DialogActions>
                    <Typography variant="body2" color="text.secondary">{posts.find((post) => post.id === postId)?.date}</Typography>
                </DialogActions>
            </Dialog>
        </Wrapper>
    );
}

let Wrapper = styled(Container)`
    color: ${({ theme }) => theme.palette.text.primary};
    min-height: 85vh;
`;
let PostImg = styled("img")`
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadows[5]};
`

let MyDialogContent = styled(DialogContent)`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    scrollbar-color: rgba(0, 0, 0, 0.2) transparent; 
    white-space: pre-wrap;
`;

