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
    Snackbar,
    Alert,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { deleteMessage, getAllMessages, Message, setMessage } from "../../store/adminReducer";

export default function Messages() {
    let dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAllMessages());
    }, []);
    let { messages, message } = useSelector((state: RootState) => state.admin);
    let [chosenMessage, setChosenMessage] = useState<Message | null>(null);
    let [open, setOpen] = useState(false);
    return (
        <Wrapper>
            <CardHeader title="Messages" />
            <Divider />
            <List>
                {messages.map((message, index) => {
                    return (
                        <ListItemButton
                            key={index}
                            onClick={() => {
                                setOpen(true);
                                setChosenMessage(message);
                            }}
                        >
                            <ListItemText>
                                {message.name} | {message.email}
                            </ListItemText>
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
                    }}
                >
                    Add
                </Button>
            </CardActions>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    setChosenMessage(null);
                }}
            >
                <DialogTitle>
                    {chosenMessage?.name}: {chosenMessage?.email}
                </DialogTitle>
                <DialogContent>
                    {chosenMessage?.message}
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            dispatch(deleteMessage(chosenMessage?.id as string));
                            setOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
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
