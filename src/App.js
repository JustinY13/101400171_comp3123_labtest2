import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import UserList from './components/UserList';
import UserPosts from './components/UserPost';
import UserComments from './components/UserComments';
import UserToDo from './components/UserTodo';
import UserAlbum from './components/UserAlbum';
import About from './components/About';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';



export default class App extends Component {

  
  render() {
    
    return (
    <div className=".background">
      <h1>Lab Test 2</h1>
      <BrowserRouter>
      <nav>       
        <Link to='/userlist'>Home</Link> | 
        <Link to='/about'>About</Link>      
      </nav>
      <Routes>
          <Route path='/about/' element= { <About /> } />
          <Route path='/userlist/' element= { <UserList /> } />
          <Route path='/UserPost/:userid' element= { <UserPosts /> } />
          <Route path='/UserComments/:userid' element= { <UserComments /> } />
          <Route path='/UserToDo/:userid' element= { <UserToDo /> } />
          <Route path='/UserAlbum/:userid' element= { <UserAlbum /> } />

        </Routes>
      </BrowserRouter>
 

    </div>
  )}
}