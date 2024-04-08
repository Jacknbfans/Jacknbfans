import React, { Component } from 'react';
//import Background from '../../components/Background'

class Login extends Component {
    constructor(props) {
      console.log('constructor');
      super(props);
    }
    render(){
        return (

          <form onSubmit="#">
            <label>
              Username:
              <input value="kevin" name="username"  type="text"  />
            </label>
            <br />
            <label>
              Password:
              <input  value="222" name="password"  type="password" />
            </label>
            <br />
            <button>Submit</button>
          </form>

        )
    }
}

export default Login