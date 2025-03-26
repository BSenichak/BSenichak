import {
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    List,
    styled,
    ListItemButton,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState, useRef } from "react";
import {
    addPost,
    deletePost,
    getBlogPosts,
    updatePost,
    setMessage
} from "../../store/adminReducer";
import { CloudDownload } from "@mui/icons-material";
import { useForm } from "react-hook-form";

function blobToBase64(blobUrl: string) {
    return new Promise((resolve, reject) => {
        fetch(blobUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result); 
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob); 
            })
            .catch(reject);
    });
}

export default function BlogForm() {
    let dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getBlogPosts());
    }, []);
    let { blogPosts, message } = useSelector((state: RootState) => state.admin);
    let [open, setOpen] = useState(false);
    let [isUpdate, setIsUpdate] = useState(false);
    let [activePostId, setActivePostId] = useState<string>("");
    let { register, handleSubmit, setValue, watch, reset } = useForm();
    let imgformref = useRef<HTMLInputElement>(null);
    let img = watch("img");
    return (
        <Wrapper>
            <CardHeader title="Works" />
            <Divider />
            <List>
                {blogPosts.map((post, index) => {
                    return (
                        <ListItemButton
                            key={index}
                            onClick={() => {
                                setOpen(true);
                                setIsUpdate(true);
                                setActivePostId(post.id);
                                setValue("title", post.title);
                                setValue("img", post.img);
                                setValue("description", post.description);
                            }}
                        >
                            <ListItemText>{post.title}</ListItemText>
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        setOpen(true);
                        setIsUpdate(false);
                    }}
                >
                    Add
                </Button>
            </CardActions>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    reset();
                }}
            >
                <form
                    onSubmit={handleSubmit(async (data) => {
                        setOpen(false);
                        data.img = await blobToBase64(data.img);
                        if (!isUpdate) {
                            dispatch(addPost(data));
                        } else {
                            data.id = activePostId;
                            dispatch(updatePost(data));
                        }
                    })}
                >
                    <DialogTitle>
                        {isUpdate ? "Update post" : "Add post"}
                    </DialogTitle>
                    <MyDialogContent>
                        <TextField
                            label="Title"
                            fullWidth
                            {...register("title")}
                            required
                            sx={{mt: 1}}
                        />
                        <Img src={img} alt="" />
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            {...register("img")}
                            onChange={(e) => {
                                setValue(
                                    "img",
                                    URL.createObjectURL(
                                        e.target.files?.item(0) as File
                                    )
                                );
                            }}
                            ref={imgformref}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            endIcon={<CloudDownload />}
                            onClick={() => imgformref.current?.click()}
                        >
                            Upload Image
                        </Button>

                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            {...register("description")}
                            required
                        />
                    </MyDialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setOpen(false)}
                            fullWidth
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        {isUpdate && (
                            <Button
                                color="error"
                                variant="contained"
                                onClick={() => {
                                    dispatch(deletePost(activePostId));
                                    setOpen(false);
                                }}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={message !== ""}
                autoHideDuration={6000}
                onClose={() => dispatch(setMessage(""))}
            >
                <Alert severity="success">{message}</Alert>
            </Snackbar>
        </Wrapper>
    );
}

let Wrapper = styled(Card)``;

let Img = styled("img")`
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: contain;
`;

let MyDialogContent = styled(DialogContent)`
    min-width: 350px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
