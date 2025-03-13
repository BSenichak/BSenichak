import {createSlice} from '@reduxjs/toolkit'

interface State{
    theme: 'light' | 'dark',
    language: string
}

const initialState: State = {
    theme: 'light',
    language: 'en',
}

const slice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
            localStorage.setItem('theme', action.payload)
        },
        loadTheme: (state) => {
            state.theme = localStorage.getItem('theme') == "light" ? 'light' : "dark"
        },
        setLanguage: (state, action) => {
            state.language = action.payload
            localStorage.setItem('language', action.payload)
        },
        loadLanguage: (state) => {
            state.language = localStorage.getItem('language') || 'en'
        },
    },
})

export const {} = slice.actions

export default slice.reducer