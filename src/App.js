import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import HomePage from './components/HomePage'

class FixedNavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Chess Visualizer</a>
          </div>
        </div>
      </nav>

    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <FixedNavBar />
        </header>

        
          <main>
            <HomePage />
          </main>


      </div>
    );
  }
}

export default App;
