import React, { Component } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import '../App.css';
import image from "../img/Toronto.jpg"; 



export default class UserList extends Component {
    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    getUsers = async() => {
        const userUrl = "https://jsonplaceholder.typicode.com/users"
        try {
            const response = await axios.get(userUrl)
            this.setState({users: response.data})
        } catch (error) {
            console.log(error)
        }
    }

    

    componentDidMount() {
        this.getUsers()
    }

    submitData = async () => {
        try {
        
        await axios.post("https://jsonplaceholder.typicode.com/users", 
            {
                username:"admin",
                password: 'pwd'
             })
             } catch (error) {
            
        }
    }

  render() {
    return (
      <div >
        <h3>User List</h3>
        {
            this.state.users.map(user => (
                <p key={user.id}>
                    {user.name} ----  
                    <NavigateButtonForUserPost userId={user.id}/>
                    <NavigateButtonForCommmentPost userId={user.id}/>
                    <NavigateButtonForUserToDo userId={user.id}/>
                    <NavigateButtonForUserAlbum userId={user.id}/>
                </p> 
            ))
        }
      </div>
    )
  }
}

const NavigateButtonForUserPost = ({ userId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/userPost/${userId}`);
    };

    return <button style={{backgroundColor: 'lightblue'}} onClick={handleClick}>Go to User's Posts</button>;
};

const NavigateButtonForCommmentPost = ({ userId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/UserComments/${userId}`);
    };

    return <button style={{backgroundColor: 'pink'}} onClick={handleClick}>Go to User's Comments</button>;
};

const NavigateButtonForUserToDo = ({ userId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/UserToDo/${userId}`);
    };

    return <button style={{backgroundColor: 'lightgreen'}} onClick={handleClick}>Go to User's To Do List</button>;
};

const NavigateButtonForUserAlbum = ({ userId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/userAlbum/${userId}`);
    };

    return <button style={{backgroundColor: 'orange'}} onClick={handleClick}>Go to User's Album</button>;
};