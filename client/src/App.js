import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './todosSlice';
import { clientCheck } from 'poll-server-check';

const BACKEND_URL = "https://todo-360.onrender.com"

function App() {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.items);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        clientCheck(BACKEND_URL);
    }, []);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddTodo = () => {
        if (name.trim()) {
            dispatch(addTodo({ name, description }));
            setName('');
            setDescription('');
        }else{
            alert("Name cannot be empty!");
        }
    };

    const handleUpdateTodo = (id, completed) => {
        dispatch(updateTodo({ id, todo: { completed: !completed } }));
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div>
            <header>
                <h1>My Todos</h1>
            </header>
            <div className="create-note">
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
            <div>
                {todos.map(todo => (
                    <div key={todo._id} className="note">
                        <h1 style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.name}</h1>
                        <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.description}</p>
                        <button onClick={() => handleUpdateTodo(todo._id, todo.completed)}>
                            {todo.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <footer>
            <p><a href="https://github.com/Ansari-Irfan-360" style={{color: "#eee", textDecoration:"underline overline" }}>&nbsp; Made by Irfan &nbsp;</a></p>
            </footer>
        </div>
    );
}

export default App;
