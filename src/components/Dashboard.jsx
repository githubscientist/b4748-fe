import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';

function Dashboard({ user, setUser, token, setToken, setIsRegistered }) {

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [notes, setNotes] = useState([]);

  const [newNote, setNewNote] = useState('');
  
  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/login/check-token-expiration', {
          headers: {
            Authorization: `bearer ${token}`
          }
        });
    } catch(e) {
          console.log('Error checking token expiration...');
          console.log(e.response.data);
          if (e.response.data.message === 'token expired') {
            console.log('Token expired...');
          setIsTokenExpired(true);
          setUser(null);
          setToken(null);
          window.localStorage.removeItem('user');
          window.localStorage.removeItem('token');
          setIsRegistered(true);
        }
      }
    }
    checkTokenExpiration();
  }, []);

  const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/notes', {
          headers: {
            Authorization: `bearer ${token}`
          }
        });
        console.log(response.data);
        setNotes(response.data);
      } catch(e) {
        console.log('Error fetching notes...', e.response.data);
      }
    }

  useEffect(() => {
    fetchNotes();
  }, []);
  
  const onLogout = () => {

    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');

    setUser(null);
    setToken(null);

    setIsRegistered(true);
  }

  const addNote = async (e) => {
    e.preventDefault();

    const noteToAdd = {
      content: newNote,
      important: false
    }

    console.log('Adding note...', noteToAdd);
    try {
      const response = await axios.post('http://localhost:3001/api/notes', noteToAdd, {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      console.log('Note added...', response.data);
      // setNotes([...notes, response.data]);
      fetchNotes();
      setNewNote('');
    } catch (error) {
      console.log('Error adding note...', error.response.data); 
    }
  }

  return (
    <div>
      {
        isTokenExpired ? (
          <LoginForm />
        ) : (
            <div>
              <p>Welcome {user.name}! <button onClick={onLogout}>Logout</button></p>
              
              <ul>
                {
                  notes.map(note => (
                    <li key={note._id}>{note.content}</li>
                  ))
                }
              </ul>

              <form onSubmit={addNote}>
                <input
                  type="text" 
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  />
                <button type="submit">Add Note</button>
              </form>
            </div>
        )
      }
    </div>
  )
}

export default Dashboard;