import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const UserComments = () => {
    const { userid } = useParams()
    const [comments, setComments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredComments, setFilteredComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${userid}/comments`);
            setComments(response.data);
            setFilteredComments(response.data);
        } catch (error) {
            alert('Error With Fetch Comment API');
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleSearch = () => {
        const results = comments.filter(comments =>
            comments.body.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredComments(results);
    };

    return (
        <div>
            <h1>All Comments For Selected User {userid}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search Comments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button style={{backgroundColor: 'lightgreen'}}  onClick={handleSearch}>Search</button>
            </div>
           
            <ul>
                {filteredComments.map(comments => (
                    <li key={comments.id}>
                        <h3>{comments.title}</h3>
                        <p>{comments.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserComments;