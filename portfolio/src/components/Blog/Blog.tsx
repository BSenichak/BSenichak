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
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router";
import Masonry from "@mui/lab/Masonry";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getBlogPosts, BlogPost } from "../../store/firebaseReducer";
import CloseIcon from "@mui/icons-material/Close";

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
    return (
        <Wrapper>
            <Typography variant="h3">{"Posts"}</Typography>

            <Masonry columns={3} spacing={2}>
                {posts.map((post) => {
                    return (
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
                        </Card>
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
                <DialogContent>
                    {posts.find((post) => post.id === postId) && (
                        <PostImg
                            src={posts.find((post) => post.id === postId)?.img}
                            alt=""
                        />
                    )}
                    <Typography variant="body1">{posts.find((post) => post.id === postId)?.description}</Typography>
                    
                </DialogContent>
            </Dialog>
        </Wrapper>
    );
}

let Wrapper = styled(Container)`
    color: ${({ theme }) => theme.palette.text.primary};
    scroll-snap-align: start;
`;
let PostImg = styled("img")`
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadows[5]};
`
