import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert } from 'react-bootstrap'

class CreateAction extends Component {
  state = {user_id: this.props.user_id, poll_name: '', poll_description: '', error: false, code: ''}

  changePollDescription = (e) => {
    this.setState({poll_description: e.target.value})
  }
  changePollName = (e) => {
    this.setState({poll_name: e.target.value})
  }

  handleSubmit = (e) => {
    fetch('/polls', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pollname: this.state.poll_name,
        description: this.state.poll_description,
        options: [0, 0.5, 1, 2, 3, 5, 8, 13],
        user: this.state.used_id
      })
    }).then(res => { 
      if (res.status === 500) {
        this.setState({error: true})
        return null
      }
      return res.json()
    }).then(poll => {
      if (poll) this.setState({poll_name: '', poll_description: '', code: poll.code})
    })
    e.preventDefault();
  }

  render() {
    return (
      <div>
        {!this.state.code ? 
          <div>
            {this.state.error === true ? <Alert bsStyle="danger"> Could not create poll. Please try again with a different name. </Alert> : null}
            <form onSubmit={this.handleSubmit}>
              <FormGroup >
                <ControlLabel> Enter the name of the poll. </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.poll_name}
                    placeholder="Poll Name"
                    onChange={this.changePollName}
                   />
                <HelpBlock>You must enter a poll name.</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel> Enter an optional description. </ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.poll_description}
                  placeholder="Poll Description"
                  onChange={this.changePollDescription}
                 />
              </FormGroup>
              <Button className="submit-button" type="submit" disabled={!this.state.poll_name}>Create Poll</Button>
            </form>
          </div>  
        : 
          <div>
            <Alert bsStyle="success"> The poll was successfully created! The code for your poll is <span id="code">{this.state.code}</span>. </Alert>
          </div>
        }
      </div>
    );
  }
}

export default CreateAction;