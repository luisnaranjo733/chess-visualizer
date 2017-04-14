import React, { Component } from 'react';
import 'whatwg-fetch';
import _ from 'lodash';

import {Openings} from './Visualizations'


class Header extends Component {
  render() {
    return (
      <h1>LiChess visualizer</h1>
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

function DelayPromise(delay) {  
  //return a function that accepts a single variable
  return function(data) {
    //this function returns a promise.
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        //a promise that is resolved after "delay" milliseconds with the data provided
        console.log(`Waiting for ${delay} ms`);
        resolve(data);
      }, delay);
    });
  }
}

let Spinner = (props) => {
  const loading = props.loading;
  if (loading) {
    return (
      <div id="spinner">
        <i className="fa fa-spinner fa-spin fa-2x" aria-hidden="true"></i>
      </div>
    );
  } else {
    return (
      <div id="spinner"></div>
    );
  }
};

export default class HomePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: 'jnaranj0',
      page: 1,
      games: [],
      loading: false,
      loaded: false
    }
  }

  onUsernameChanged = (event) => {
    this.setState({ username: event.target.value });
  }

  getNextPage = () => {
    if (this.state.page != null) {
      let url = `https://en.lichess.org/api/user/${this.state.username}/games?with_opening=1&nb=100&page=${this.state.page}`;
      let outerThis = this;
      
      fetch(url)
        .then(function (response) {
          return response.text();
        }).then(function (json) {
          json = JSON.parse(json);
          let games = _.concat(outerThis.state.games, json.currentPageResults)
          outerThis.setState({ games: games, page: json.nextPage });  
        }).then(DelayPromise(1000)).then(() => {
          this.getNextPage();
        });
    } else {
      console.log('Finished paging through data!');
      // Disable loading spinner
      this.setState({
        loading: false,
        loaded: true
      });
    }

  }

  onSubmit = () => {
    this.setState({loading: true});
    this.getNextPage()
    // enable loading spinner
  }


  render() {
    return (
      <div className='container'>
        <Header />
        <p>Url: {this.state.username}</p>
        <p>Next page: {this.state.page}</p>
        <p>Games: {this.state.games.length}</p>
        <Spinner loading={this.state.loading}/>
        <UsernameForm onUsernameChanged={this.onUsernameChanged} onSubmit={this.onSubmit} />

        <Openings loaded={this.state.loaded} games={this.state.games} username={this.state.username}/>
      </div>
    );
  }
}

