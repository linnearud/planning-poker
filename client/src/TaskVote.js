import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert, Radio } from 'react-bootstrap'

class TaskVote extends Component {
  state = {user_id: this.props.user_id, poll: this.props.poll, vote: this.props.vote, option: '', success: false}

  componentDidMount() {
    if (this.state.vote) {
      this.setState({option: this.state.vote.option})
    }
  }

  handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    fetch('/votes', {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: this.state.user_id, poll_id: this.state.poll._id, option: this.state.option})
    }).then(res => { 
      return res.json()
    }).then(vote => {
      this.setState({vote: vote, success: true})
    })
  }

  changeOption = (e) => {
    this.setState({option: e.target.value})
  }

  // handleSubmit = (e) => {
  //   fetch('/votes', {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       user_id: this.state.user._id,
  //       poll_id: this.state.poll._id        
  //     })
  //   }).then(res => { 
  //     return res.json()
  //   }).then(vote => {
  //     if (vote) {
  //       this.setState({vote: vote})
  //       this.setState({success: true})
  //     } 
  //   })
  //   e.preventDefault()
  // }

  render() {
    return (

      <div>
      {this.state.success ? <Alert bsStyle='success'> You vote has been saved! </Alert>: null}

          {this.state.poll.pollname}
          {this.state.poll.description}
      {this.state.vote ? 
            <div>
              <Alert bsStyle="warning"> You have already voted for {this.state.vote.option} in this poll, but you can change your vote here. </Alert>
            </div>
          :
           null
          }
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              {this.state.poll.options.map(function(option) {
                return <Radio name="radioGroup" onChange={this.changeOption} value={option}> {option} </Radio>
              }, this)}
            </FormGroup>
            <Button type="submit"> Submit </Button>
          </form>
      </div> 
    );
  }
}

export default TaskVote;