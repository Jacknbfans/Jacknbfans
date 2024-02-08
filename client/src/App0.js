import React, { Component } from 'react';
import { BrowserRouter,Routes,Route,Switch,Redirect,Link} from 'react-router-dom'
import Home from './Home.js'
import logo from './logo.svg';
import './App.css';


/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

/* class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://104.128.95.54:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .then(err => err);
  }

  componentDidMount() {
      this.callAPI();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-intro">{this.state.apiResponse}</p>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
} */


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://104.128.95.54:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .then(err => err);
  }

  componentDidMount() {
      this.callAPI();
  }


  render(){
    return (
      <form  >
        <label>name:</label>
        <input className="loginName" type="text" value={this.state.apiResponse} />
        <br/>
        <label>pwsd:</label>
        <input className="loginPwsd" type="text" value={this.state.apiResponse} />
        <br/>
        <input type="submit"  />
        <BrowserRouter>
        <button>
        <Link to='/home'>666</Link>
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
        </button>
      </BrowserRouter>
 
      </form>
    );
  }
}

export default App;
