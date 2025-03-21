import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, query, getDocs, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

interface State {
    loading: boolean;
    works: Work[];
    status: string | null;
}

const initialState: State = {
    loading: false,
    works: [],
    status: null,
};

const slice = createSlice({
    name: "firebase",
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllWorks.fulfilled, (state, action) => {
                state.loading = false;
                state.works = action.payload;
            })
            .addCase(getAllWorks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllWorks.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(addMessage.fulfilled, (state) => {
                state.loading = false;
                state.status = "Message has been sent, I will contact you soon";
            })
            .addCase(addMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMessage.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default slice.reducer;

export interface Work {
    title: string;
    description: string;
    subtitle: string;
    img: string;
}

export const getAllWorks = createAsyncThunk<Work[], void>(
    "firebase/getAllWorks",
    async () => {
        const q = query(collection(db, "myworks"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => doc.data() as Work);
    }
);

export interface Message {
    name: string;
    email: string;
    message: string;
}

export const addMessage = createAsyncThunk(
    "firebase/addMessage",
    async (data: Message, { dispatch }) => {
        const docRef = await addDoc(collection(db, "messages"), {
            ...data,
        });
        await dispatch(sendEmail(data));
        return docRef.id;
    }
);

export const sendEmail = createAsyncThunk(
    "firebase/sendEmail",
    async (data: Message) => {
        let response = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            (data as unknown) as any,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return response.status;
    }
);

export const { setStatus } = slice.actions
