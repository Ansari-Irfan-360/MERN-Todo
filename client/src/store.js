import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import todosReducer from './todosSlice';

const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
