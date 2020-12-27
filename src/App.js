import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import About from "./components/About";
import Home from "./pages/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from "./pages/NotFound";
import "./assets/css/style.css";
import SinglePostTemplate from "./pages/SinglePostTemplate";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Loading from "./components/Loading/Loading";

class App extends React.Component {
  state = {
    authUser: false,
    loading: true,
  };
  componentDidMount() {
    const tempToken = JSON.parse(localStorage.getItem("userToken"));
    const status = tempToken ? tempToken.token : null;
    if (status) {
      this.setState({
        authUser: true,
        loading: false,
      });
    } else {
      this.setState({
        authUser: false,
        loading: false,
      });
    }
  }

  render() {
    const { authUser, loading } = this.state
    return loading ? (
      <Loading />
    ) : (
      <>
        <Router>
          <Switch>
            <Route exact path="/" render={() => authUser ? <Redirect to="/home" /> : <Redirect to="/login" />} />
            <Route path="/search/keyword:keyword" render={() => authUser ? <Search /> : <Redirect to="/login" />}  />
            <Route path="/post/:slug" render={() => authUser ? <SinglePostTemplate /> : <Redirect to="/login" />}  />
            <Route path="/category/:id" render={() => authUser ? <Category /> : <Redirect to="/login" />}  />
            <Route path="/about" render={() => authUser ? <About /> : <Redirect to="/login" />}  />
            <Route path="/contact" render={() => authUser ? <Contact /> : <Redirect to="/login" />}  />
            <Route path="/categories" render={() => authUser ? <Categories /> : <Redirect to="/login" />}  />
            <Route path="/home" render={() => authUser ? <Home /> : <Redirect to="/login" />}  />
            <Route path="/login" render={() => authUser ? <Redirect to="/home" /> : <Login />}  />
            <Route render={() => authUser ? <NotFound /> : <Redirect to="/login" />}  />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
