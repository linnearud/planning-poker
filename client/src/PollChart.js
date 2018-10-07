import React, { Component } from 'react';
import './App.css';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell} from 'recharts';
import socketIOClient from 'socket.io-client'

class View extends Component {
  state = {poll: this.props.poll, votes: []}

  componentDidMount() {
    this.getVotes()
    const socket = socketIOClient("http://localhost:3001")
    socket.on('vote_changed', (poll_id) => {
      console.log(poll_id)
      console.log(this.state.poll._id)
      if (poll_id === this.state.poll._id) {
        console.log('eq')
        this.getVotes()
      }
    })
  }

  groupBy = (arr, prop) => {
    return arr.reduce((groups, item) => {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }


  getVotes = () => {
    var uri = "votes/" + this.state.poll._id;
    fetch(uri, {
      method: "GET",
    }).then(res => { 
      return res.json()
    }).then(votes => {
      if (votes) {
        var groupedVotes = this.groupBy(votes, 'option')
        var pollVotes = []
        this.state.poll.options.forEach(option => {
          pollVotes.push({x: option, y: groupedVotes[option] ? groupedVotes[option].length : 0})
        })
        this.setState({votes: pollVotes})
      }
    })

  }

  render() {
    const colors = ['#000000', '#ed2024', '#afafb0', '#ed2024', '#afafb0', '#000000', '#afafb0', '#ed2024'];
    return (
      <div>
        <div> Task code: <span id="code"> {this.state.poll.code} </span> </div>
        <div className="task-name">{this.state.poll.pollname}</div>
        <div className="task-description">{this.state.poll.description}</div>
        <ResponsiveContainer width='100%' height={400}>
          <BarChart data={this.state.votes }>
            <XAxis dataKey="x" />
            <YAxis />
            <Bar dataKey="y">
              {
              this.state.votes.map((entry, index) => {
                const color = colors[index];
                return <Cell fill={color} />
              })
            }
            </Bar>
          </BarChart>
        </ResponsiveContainer >
      </div>
    );
  }
}

export default View;