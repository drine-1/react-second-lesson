import React, { Component } from "react";
import axios from "axios";
import { AUTH_LOGIN } from "../config/ApiEndPoint";

export default class Login extends Component {
  state = {
      username:'',
      password:'',
      loading: false
  }
  handleOnChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }
  handleOnSubmit = async(e) => {
    e.preventDefault()
    this.setState({
        loading: true
    })
    const username = this.state.username
    const password = this.state.password
    const validateData = {
        username: username,
        password: password
    }
    axios
    .post(AUTH_LOGIN,validateData)
    .then( res => {
        console.log("resssssssss",res.data)
        localStorage.setItem('userToken',JSON.stringify(res.data))
        this.setState({
            loading: false
        })
        window.location.reload()
    })
    .catch( err => console.log('error is',err))
  }
  render() {
    return (
      <div className="container">
        <div className="d-table w-100 h-100">
          <div
            className="d-table-cell align-middle"
            style={{
              height: "500px",
            }}
          >
            <div className="col-12 col-sm-6 col-md-4 mx-auto">
              <form onSubmit={this.handleOnSubmit.bind(this)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control shadow-none rounded-0"
                    placeholder="Username"
                    style={{
                        height: "40px",
                      }}
                      name="username"
                      value={this.state.username}
                      onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control shadow-none rounded-0"
                    placeholder="Password"
                    style={{
                        height: "40px",
                      }}
                      name="password"
                      value={this.state.password}
                      onChange={this.handleOnChange}
                  />
                </div>
                <button type="submit" className="btn btn-dark w-100 p-2 border-0 shadow-sm rounded-0">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
