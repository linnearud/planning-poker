import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap'
import { Breadcrumb } from 'react-bootstrap'
import CreateAction from './CreateAction'
import VoteAction from './VoteAction'
import ViewAction from './ViewAction'

class Home extends Component {
  state = {user: this.props.user, chosenAction: null}

  goHome = () => {
    this.setState({chosenAction: null})
  }

  createNewPoll = () => {
    this.setState({chosenAction: 'Create'})
  }

  voteInPoll = () => {
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
              <Button onClick={this.createNewPoll}>Create a new poll</Button>
              <Button onClick={this.voteInPoll}> Vote in an existing poll </Button>
              <Button onClick={this.viewResults}> View the results for a poll </Button>
            </div>
          </div>
        : 
          null
        }
        {this.state.chosenAction === 'Create' ? <CreateAction user_id={this.state.user._id}/> : null}
        {this.state.chosenAction === 'Vote' ? <VoteAction user_id={this.state.user._id}/> : null}
        {this.state.chosenAction === 'View' ? <ViewAction /> : null}
      </div>
    );
  }
}

export default Home;