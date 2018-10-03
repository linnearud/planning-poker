import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/votes', {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: '5bb49348e55ccc0ee4bddf4c',
        poll_id: '5bb48724e4dfad3160de7fff',
        option: 2
      })
    }).then(res => {
      console.log(JSON.res)
      res.json()
    });
  }

  render() {
  const socket = socketIOClient("http://localhost:3001")
  socket.on('vote_changed', (col) => {
      console.log(col)
    })
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;