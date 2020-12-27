import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import LOGO from "../assets/images/logo512.png";
import { COLOR } from "./Color/Color";

 class Header extends Component {
  state = {
    searchText: "",
  };
  handleOnChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };
  handleKeyUp = (e) => {
    e.preventDefault()
    if( e.key === 'Enter' && e.keyCode === 13){
      this.handleOnClick()
    }
  }
  handleOnClick = () => {
    if (this.state.searchText) {
      const searchWord = this.state.searchText;
      //console.log("searchworddddddddd",searchWord)
      this.setState({
        searchText:''
      })
      this.props.history.push({
        pathname: `/search/keyword=${searchWord}`,
        state: {
          searchText: searchWord,
        },
      });
    }
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div
        style={{
          background: COLOR.FourthColor,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Link to="/" className="text-decoration-none">
                <img src={LOGO} alt="Header Logo" width="60" />
              </Link>
            </div>
            <div className="col-4 align-self-center">
              <form
                className="form-inline my-auto"
                onSubmit={this.handleOnSubmit.bind(this)}
                autoComplete="off"
              >
                <input
                  className="form-control mr-sm-2 shadow-none border-0"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.searchText}
                  onChange={this.handleOnChange}
                  onKeyUp={this.handleKeyUp}
                  name="search"
                />
                <button
                  className="btn btn-outline-light my-2 my-sm-0"
                  type="submit"
                  onClick={this.handleOnClick}
                >
                  Search
                </button>
              </form>
            </div>
            <div className="col-5">
              <ul className="list-unstyled text-right">
                <li className="d-inline-block py-3">
                  <Link to="/" className="text-decoration-none px-3 text-white">
                    Home
                  </Link>
                </li>
                <li className="d-inline-block">
                  <Link
                    to="/about"
                    className="text-decoration-none px-3 text-white"
                  >
                    About
                  </Link>
                </li>
                <li className="d-inline-block">
                  <Link
                    to="/categories"
                    className="text-decoration-none px-3 text-white"
                  >
                    Categories
                  </Link>
                </li>
                <li className="d-inline-block">
                  <Link
                    to="/contact"
                    className="text-decoration-none px-3 text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header)
