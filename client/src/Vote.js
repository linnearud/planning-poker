import React, { Component } from 'react';
import TaskVote from './TaskVote'
import './App.css';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert, Radio } from 'react-bootstrap'

class Vote extends Component {
  state = {user_id: this.props.user_id, poll_code: '', poll: null, vote: null, error: false, success: false}

  changeTaskCode = (e) => {
    this.setState({poll_code: e.target.value})
  }

  handleSubmit = (e) => {
    var uri = "polls/" + this.state.poll_code;
    fetch(uri, {
      method: "GET",
    }).then(res => { 
      return res.json()
    }).then(poll => {
      if (poll) {
        this.setState({poll: poll})
        this.getVote()
      } else {
        this.setState({error: true})
      }
    })
    e.preventDefault()
  }

  getVote = () => {
    var uri = "votes/" + this.state.poll._id + '/' + this.state.user_id;
    fetch(uri, {
      method: "GET",
    }).then(res => { 
      return res.json()
    }).then(vote => {
      if (vote) this.setState({vote: vote})
    })
  }

  render() {
    return (
      <div>
      {!this.state.poll ? 
        <div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup >
              <ControlLabel> Enter the task code. </ControlLabel>
              <FormControl
                type="text"
                value={this.state.poll_code}
                placeholder="Task Code"
                onChange={this.changeTaskCode}
               />
            </FormGroup>
            <Button className="submit-button" type="submit" disabled={!this.state.poll_code}>Enter</Button>
          </form>
          {this.state.error === true ? <Alert bsStyle="warning"> Could not find task. Make sure you entered the correct code. </Alert> : null}
        </div>
      :
          
          <TaskVote user_id={this.state.user_id} poll={this.state.poll} vote={this.state.vote} />

      }
      </div> 
    );
  }
}

export default Vote;