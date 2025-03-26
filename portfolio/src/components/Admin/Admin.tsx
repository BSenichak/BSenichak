import { styled } from "@mui/material";
import { Container } from "@mui/system";
import WorksForm from "./WorksForm";
import Messages from "./Messages";
import { useState } from "react";
import AuthForm from "./AuthForm";

function Admin() {
    let [isAuth, setIsAuth] = useState<boolean>(false);
    return (
        <Wrapper>
            {isAuth ? (
                <>
                    <WorksForm />
                    <Messages />
                </>
            ) : (
                <AuthForm setIsAuth={setIsAuth} />
            )}
        </Wrapper>
    );
}

export default Admin;

let Wrapper = styled(Container)`
    color: ${({ theme }) => theme.palette.text.primary};
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-height: 85vh;
`;
