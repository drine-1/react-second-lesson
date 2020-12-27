import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";

export default class Contact extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    mailSent: false,
    error: "",
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    const URL = "https://yourdomain.com/form/contact.php";
    axios({
      method: "post",
      url: `${URL}`,
      headers: {
        "content-type": "application/json",
      },
      data: this.state,
    })
      .then((result) => {
        this.setState({
          mailSent: result.data.sent,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.messages,
        });
      });
  };
  resetForm = () => {
    this.setState({
      name: "",
      email: "",
      message: "",
      mailSent: false,
      error: "",
    });
  };
  render() {
    return (
      <>
        <Header />
        <div className="container pt-5">
          <form onSubmit={this.handleOnSubmit.bind(this)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                //   onChange={(e) => {
                //     this.setState({
                //       name: e.target.value,
                //     });
                //   }}
                onChange={this.handleOnChange}
                name="name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={this.handleOnChange}
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Message"
                onChange={this.handleOnChange}
                name="message"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mb-3" >
              Send Message
            </button>

            {this.state.error && (
              <div>
                You got error. Try again
                <button onClick={this.resetForm}>Close</button>
              </div>
            )}
            {this.state.mailSent && (
              <div>
                <p>mail sent successfully</p>
              </div>
            )}
          </form>
        </div>
        <Footer />
      </>
    );
  }
}
