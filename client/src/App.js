import React, { Component } from 'react';
import Header from './Header'
import Home from './Home'
import './App.css';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap'

class App extends Component {
  state = {username: '', canSumbit: false, user: null}

  getUsernameValidationState = () => {
    var username = this.state.username || "";
    var returnVal = 'error'
    if (username.match("^[A-z0-9]+$")) {
      returnVal = 'success'
    } else if (username === "") {
      returnVal = null;
    }
    this.setCanSumbit(returnVal)
    return returnVal;
  }

  setCanSumbit = (val) => {
    if (val === 'success' && this.state.canSumbit === false){
      this.setState({canSumbit: true})
    } else if ((val === 'error' || val === null) && this.state.canSumbit === true){
      this.setState({canSumbit: false})
    }
  }

  changeUsername = (e) => {
    this.setState({username: e.target.value})
  }

  handleSubmit = (e) => {
    var uri = "users/" + this.state.username;
    fetch(uri, {
      method: "GET",
    }).then(res => { 
      return res.json()
    }).then(user => {
      if (!user) {
        this.createNewUser()
      } else {
        this.setState({user: user})
      }
    })
    e.preventDefault()
  }

  createNewUser = (e) => {
    fetch('/users', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.state.username})
    }).then(res => { 
      return res.json()
    }).then(user => {
      this.setState({user: user})
    })
  }

  render() {
      return (
        <div>
          {!this.state.user ?
            <div>
              <Header />
              <div className="app-container">
                <form onSubmit={this.handleSubmit}>
                  <FormGroup validationState = {this.getUsernameValidationState()}>
                    <ControlLabel bsClass="control-label"> Enter your username. If your username does not exist, it will be created for you. </ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.username}
                      placeholder="Username"
                      onChange={this.changeUsername}
                    />
                    <HelpBlock>Username can only contain letters or digits.</HelpBlock>
                  </FormGroup>
                  <Button className="submit-button" type="submit" disabled={!this.state.canSumbit}>Continue</Button>
                </form>
              </div>
            </div>
          :
            <div>
              <Header />
              <div className="app-container">
                <Home user={this.state.user} />
              </div>
            </div>
          }
        </div>
      );    
  }
}


export default App;