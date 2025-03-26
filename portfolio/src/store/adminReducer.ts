import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";

interface AdminState {
    loading: boolean;
    works: Work[];
    message: string;
    messages: Message[];
}

const initialState: AdminState = {
    loading: false,
    works: [],
    message: "",
    messages: [],
};

let adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setMessage(state, action) {
            state.message = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getAllWorks.fulfilled, (state, action) => {
                state.loading = false;
                state.works = action.payload;
            })
            .addCase(getAllWorks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllWorks.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message || "";
            });

        builder
            .addCase(updateWork.fulfilled, (state) => {
                state.loading = false;
                state.message = "Work has been updated";
            })
            .addCase(updateWork.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateWork.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message || "";
            });
        builder
            .addCase(addWork.fulfilled, (state) => {
                state.loading = false;
                state.message = "Work has been added";
            })
            .addCase(addWork.pending, (state) => {
                state.loading = true;
            })
            .addCase(addWork.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message || "";
            });
        builder
            .addCase(deleteWork.fulfilled, (state) => {
                state.loading = false;
                state.message = "Work has been deleted";
            })
            .addCase(deleteWork.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteWork.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message || "";
            });
        builder
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(getAllMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message || "";
            });
        builder
            .addCase(deleteMessage.fulfilled, (state) => {
                state.loading = false;
                state.message = "Message has been deleted";
            })
            .addCase(deleteMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.loading = false;
                state.message = action.error.message || "";
            });
    },
});

export const { setMessage } = adminSlice.actions;

export default adminSlice.reducer;

export interface Work {
    id: string;
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
        return querySnapshot.docs.map((doc) => {
            let work = doc.data() as Work;
            work.id = doc.id;
            return work;
        });
    }
);

export const updateWork = createAsyncThunk(
    "firebase/updateWork",
    async (data: Work | any, { dispatch }) => {
        let { id, ...body } = data;
        const docRef = doc(db, "myworks", id as string);
        await updateDoc(docRef, body);
        await dispatch(getAllWorks());
        return data;
    }
);

export const addWork = createAsyncThunk(
    "firebase/addWork",
    async (data: any, { dispatch }) => {
        const docRef = await setDoc(
            doc(db, "myworks", new Date().getTime().toString()),
            {
                ...data,
            }
        );
        await dispatch(getAllWorks());
        return docRef;
    }
);

export const deleteWork = createAsyncThunk(
    "firebase/deleteWork",
    async (id: string, { dispatch }) => {
        const docRef = await deleteDoc(doc(db, "myworks", id));
        await dispatch(getAllWorks());
        return docRef;
    }
);

export interface Message {
    name: string;
    email: string;
    message: string;
    id: string;
}

export const getAllMessages = createAsyncThunk<Message[], void>(
    "firebase/getAllMessages",
    async () => {
        const q = query(collection(db, "messages"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => {
            let message = doc.data() as Message;
            message.id = doc.id;
            return message;
        });
    }
);

export const deleteMessage = createAsyncThunk(
    "firebase/deleteMessage",
    async (id: string, { dispatch }) => {
        const docRef = await deleteDoc(doc(db, "messages", id));
        await dispatch(getAllMessages());
        return docRef;
    }
);
