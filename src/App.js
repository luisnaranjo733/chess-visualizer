import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class FixedNavBar extends Component {
  render() {

    const navBarStyle = {
      borderBottom: 'thin solid black',
      backgroundColor: 'white'
    }

    return (
      /*<nav style={navBarStyle}>
        <ul>
          <li><Link to="/">{this.props.rubricName ? this.props.rubricName : String('Inline Grader')}</Link></li>
        </ul>
      </nav>*/

      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Brand</a>
            <a className="navbar-brand" href="#">Brand</a>
            <a className="navbar-brand" href="#">Brand</a>
          </div>
        </div>
      </nav>

    )
  }
}

class HomePage extends Component {
  render() {
    return (
      <div className='container'>
        <h1>test</h1>
      </div>
    );
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
