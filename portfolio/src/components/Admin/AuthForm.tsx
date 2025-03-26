import {
    Button,
    Card,
    CardHeader,
    Divider,
    styled,
    Snackbar,
    Alert,
    CardContent,
    TextField,
    CardActions,
} from "@mui/material";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface AuthFormProps {
    setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export default function AuthForm({ setIsAuth }: AuthFormProps) {
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("");
    return (
        <Wrapper>
            <CardHeader title="Login" />
            <Divider />
            <CardContent>
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
            </CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
                <Button
                    onClick={() => {
                        if (password === import.meta.env.VITE_PASSWORD) {
                            setIsAuth(true);
                        }else{
                            setMessage("Wrong password");
                            setPassword("");
                        }
                    }}
                    variant="contained"
                >
                    Login
                </Button>
            </CardActions>
            <Snackbar open={message !== ""} autoHideDuration={6000} onClose={() => {setMessage("")}}>
                <Alert severity="error">{message}</Alert>
            </Snackbar>
        </Wrapper>
    );
}

let Wrapper = styled(Card)``;
