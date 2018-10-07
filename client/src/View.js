import React, { Component } from 'react';
import './App.css';
import PollChart from './PollChart'
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap'

class View extends Component {
  state = {poll_code: '', poll: null, error: false}

  changePollCode = (e) => {
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
          {this.state.error === true ? <Alert bsStyle="warning"> Could not find poll. Make sure you entered the correct code. </Alert> : null}
          <form onSubmit={this.handleSubmit}>
            <FormGroup >
              <ControlLabel> Enter the poll code. </ControlLabel>
              <FormControl
                type="text"
                value={this.state.poll_code}
                placeholder="Poll Code"
                onChange={this.changePollCode}
               />
            </FormGroup>
            <Button className="submit-button" type="submit" disabled={!this.state.poll_code}>Enter</Button>
          </form>
        </div>
      : 
        <PollChart poll={this.state.poll} />
      }
      </div> 
    );
  }
}

export default View;