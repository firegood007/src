import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  test = () => {
    let self = this;
    let params = {
      name: self.refs.name.value,
      password: self.refs.password.value
    };
    axios({
        method: 'get',
        url: '/api/login',
        params, // get 请求时带的参数
        timeout: 10000,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }).then(function(data) {
      console.log(data);
    })
  }
  render() {
    return (
      <div className="App">
        <div>  
          用户名：<input type="text" ref="name" />
        </div>
        <div>
          密码：<input type="text"  ref="password" />
        </div>
        <button onClick={this.test}> 登陆  </button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
