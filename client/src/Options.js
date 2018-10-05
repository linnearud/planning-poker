import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap'
import { Breadcrumb } from 'react-bootstrap'
import Create from './Create'
import Vote from './Vote'
import View from './View'

class Options extends Component {
  state = {user: this.props.user, chosenAction: null}

  goHome = () => {
    this.setState({chosenAction: null})
  }

  createNewTask = () => {
    this.setState({chosenAction: 'Create'})
  }

  voteOnTask = () => {
    this.setState({chosenAction: 'Vote'})
  }

  viewResults = () => {
    this.setState({chosenAction: 'View'})
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item onClick={this.goHome}> Home </Breadcrumb.Item>
          {this.state.chosenAction ? <Breadcrumb.Item active> {this.state.chosenAction} </Breadcrumb.Item> : null}
        </Breadcrumb>
        {!this.state.chosenAction ? 
          <div>
            <div className="welcome"> Welcome {this.state.user.username}! What would you like to do? </div>
            <div className="buttons">
              <Button onClick={this.createNewTask}>Create a new task</Button>
              <Button onClick={this.voteOnTask}> Vote on an existing task </Button>
              <Button onClick={this.viewResults}> View the results for a task </Button>
            </div>
          </div>
        : 
          null
        }
        {this.state.chosenAction === 'Create' ? <Create user_id={this.state.user._id}/> : null}
        {this.state.chosenAction === 'Vote' ? <Vote user_id={this.state.user._id}/> : null}
        {this.state.chosenAction === 'View' ? <View /> : null}
      </div>
    );
  }
}

export default Options;