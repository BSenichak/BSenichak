import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { collection, query, getDocs, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";

export interface BlogPost {
    title: string;
    description: string;
    img: string;
    id: string;
    date: string;
}

interface State {
    loading: boolean;
    works: Work[];
    status: string | null;
    randomBlogPost: BlogPost | null;
    blogPosts: BlogPost[];
}

const initialState: State = {
    loading: false,
    works: [],
    status: null,
    randomBlogPost: null,
    blogPosts: [],
};

const slice = createSlice({
    name: "firebase",
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
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
        builder
            .addCase(getRandomBlogPost.fulfilled, (state, action) => {
                state.loading = false;
                state.randomBlogPost = action.payload;
            })
            .addCase(getRandomBlogPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRandomBlogPost.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(getBlogPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.blogPosts = action.payload;
            })
            .addCase(getBlogPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBlogPosts.rejected, (state) => {
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
            data as unknown as any,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        return response.status;
    }
);

export const getRandomBlogPost = createAsyncThunk(
    "firebase/getRandomBlogPost",
    async () => {
        const q = query(collection(db, "blog"));
        const querySnapshot = await getDocs(q);
        let randomIndex = Math.floor(Math.random() * querySnapshot.docs.length);
        let post = querySnapshot.docs[randomIndex].data();
        post.id = querySnapshot.docs[randomIndex].id;
        return post as BlogPost;
    }
);

export const getBlogPosts = createAsyncThunk(
    "firebase/getBlogPosts",
    async () => {
        const q = query(collection(db, "blog"));
        const querySnapshot = await getDocs(q);
        let posts = querySnapshot.docs.map((doc) => {
            let post = doc.data() as BlogPost;
            post.id = doc.id;
            return post;
        });
        return posts;
    }
);

export const { setStatus } = slice.actions;
