import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert } from 'react-bootstrap'

class Create extends Component {
  state = {user_id: this.props.user_id, task_name: '', task_description: '', error: false, code: ''}

  changeTaskDescription = (e) => {
    this.setState({task_description: e.target.value})
  }
  changeTaskName = (e) => {
    this.setState({task_name: e.target.value})
  }

  handleSubmit = (e) => {
    fetch('/polls', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pollname: this.state.task_name,
        description: this.state.task_description,
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
      if (poll) this.setState({task_name: '', task_description: '', code: poll.code})
    })
    e.preventDefault();
  }

  render() {
    return (
      <div>
        {!this.state.code ? 
          <div>
            <form onSubmit={this.handleSubmit}>
              <FormGroup >
                <ControlLabel> Enter the name of the task. </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.task_name}
                    placeholder="Task Name"
                    onChange={this.changeTaskName}
                   />
                <HelpBlock>You must enter a task name.</HelpBlock>
              </FormGroup>
              <FormGroup>
                <ControlLabel> Enter a task description. </ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.task_description}
                  placeholder="Task Description"
                  onChange={this.changeTaskDescription}
                 />
              </FormGroup>
              <Button className="submit-button" type="submit" disabled={!this.state.task_name}>Create Task</Button>
            </form>
            {this.state.error === true ? <Alert bsStyle="danger"> Could not create task. Please try again with another task name. </Alert> : null}
          </div>  
        : 
          <div>
            The task was successfully created! The code for your task is {this.state.code}.
          </div>
        }
        </div>
    );
  }
}

export default Create;