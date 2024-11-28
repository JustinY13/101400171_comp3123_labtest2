import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const UserToDo = () => {
    const { userid } = useParams()
    const [todos, setTodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTodos, setFilteredTodos] = useState([]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userid}/todos`);
            setTodos(response.data);
            setFilteredTodos(response.data);
        } catch (error) {
            alert('Error With Fetch To Do API');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleSearch = () => {
        const results = todos.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTodos(results);
    };

    return (
        <div>
            <h1>All "To Do" Tasks for Selected User {userid}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search To Do Tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button style={{backgroundColor: 'lightgreen'}}  onClick={handleSearch}>Search</button>
            </div>
       
            <ul>
                {filteredTodos.map(todos => (
                    <li key={todos.id}>
                        <h3>{todos.title}</h3>
                        <p>{todos.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserToDo;