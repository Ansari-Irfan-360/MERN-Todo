import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = "http://localhost:5000"

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get(`${BACKEND_URL}/todos`);
    return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
    const response = await axios.post(`${BACKEND_URL}/todos`, todo);
    return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, todo }) => {
    const response = await axios.put(`${BACKEND_URL}/todos/${id}`, todo);
    return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await axios.delete(`${BACKEND_URL}/todos/${id}`);
    return id;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex(todo => todo._id === action.payload._id);
                state.items[index] = action.payload;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter(todo => todo._id !== action.payload);
            });
    },
});

export default todosSlice.reducer;
