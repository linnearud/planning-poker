import React, { Component } from 'react';
import './App.css';
import { FormGroup, Button, Alert, Radio } from 'react-bootstrap'

class PollVote extends Component {
  state = {user_id: this.props.user_id, poll: this.props.poll, vote: this.props.vote, option: '', success: false}

  componentDidMount() {
    var uri = "votes/" + this.state.poll._id + '/' + this.state.user_id;
    fetch(uri, {
      method: "GET",
    }).then(res => { 
      return res.json()
    }).then(vote => {
      if (vote) {
        this.setState({vote: vote})
      }
    })
  }

  handleSubmit = (e) => {
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

  render() {
    return (
      <div>
        {this.state.success ? <Alert bsStyle='success'> You vote has been saved! </Alert> :
        <div>
          {this.state.vote ? 
            <div>
              <Alert bsStyle="warning"> You have already voted for {this.state.vote.option} in this poll, but you can change your vote here. </Alert>
            </div>
          :
           null
          }
          <div> Poll code: <span id="code"> {this.state.poll.code} </span> </div>
          <div className="poll-name">{this.state.poll.pollname}</div>
          <div className="poll-description"> {this.state.poll.description} </div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              {this.state.poll.options.map(function(option) {
                return <Radio name="radioGroup" onChange={this.changeOption} value={option}> {option} </Radio>
              }, this)}
            </FormGroup>
            <Button type="submit"> Submit </Button>
          </form>
          </div>
        }
      </div> 
    );
  }
}

export default PollVote;