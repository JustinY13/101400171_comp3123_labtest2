import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const UserPosts = () => {
    const { userid } = useParams()
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]); 

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userid}/posts`);
            setPosts(response.data);
            setFilteredPosts(response.data);
        } catch (error) {
            alert('Error With Fetch Post API');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearch = () => {
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(results);
    };

    return (
        <div>
            <h1>All Posts For Selected User {userid}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button style={{backgroundColor: 'lightgreen'}} onClick={handleSearch}>Search</button>
            </div>
         
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPosts;