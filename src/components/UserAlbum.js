import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const UserAlbum = () => {
    const { userid } = useParams()
    const [albums, setAlbums] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAlbums, setFilteredAlbums] = useState([]);

 
    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${userid}/albums`);
            setAlbums(response.data);
            setFilteredAlbums(response.data);
        } catch (error) {
            alert('Error With Fetch Album API');
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);


    const handleSearch = () => {
        const results = albums.filter(albums =>
            albums.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAlbums(results);
    };

    return (
        <div>
            <h1>All Albums for Selected User {userid}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search albums..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button style={{backgroundColor: 'lightgreen'}}  onClick={handleSearch}>Search</button>
            </div>
           
            <ul>
                {filteredAlbums.map(albums => (
                    <li key={albums.id}>
                        <h3>{albums.title}</h3>
                        <p>{albums.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserAlbum;