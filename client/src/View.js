import React, { Component } from 'react';
import './App.css';
import PollChart from './PollChart'
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap'

class View extends Component {
  state = {poll_code: '', poll: null, error: false}

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
      } else {
        this.setState({error: true})
      }
    })
    e.preventDefault()
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
        <PollChart poll={this.state.poll} />
      }
      </div> 
    );
  }
}

export default View;