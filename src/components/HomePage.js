import React, { Component } from 'react';
import 'whatwg-fetch'

class Header extends Component {
  render() {
    return (
      <h1>Chess visualizer</h1>
    );
  }
}

class UsernameForm extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Username" onChange={this.props.onUsernameChanged} />
        </div>
        <button type="submit" className="btn btn-default" onClick={this.props.onSubmit}>Submit</button>
      </div>
    );
  }
}

export default class HomePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: 'jnaranj0',
      page: 1,
      response: null
    }
  }

  onUsernameChanged = (event) => {
    this.setState({ username: event.target.value });
  }

  onSubmit = () => {
    let url = `https://en.lichess.org/api/user/${this.state.username}/games?with_opening=1&page=${this.state.page}`;
    console.log(url);

    let outerThis = this;

    fetch(url)
      .then(function (response) {
        return response.text();
      }).then(function (json) {
        json = JSON.parse(json);
        outerThis.setState({response: json});
        console.log(json);
      })
  }


  render() {
    return (
      <div className='container'>
        <Header />
        <p>Url: {this.state.username}</p>
        {/*<pre>{this.state.response}</pre>*/}
        <UsernameForm onUsernameChanged={this.onUsernameChanged} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

