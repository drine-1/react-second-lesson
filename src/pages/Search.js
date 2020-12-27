import React, { Component } from "react";
import { EMBEDD_URL, POSTS_URL } from "../config/ApiEndPoint";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, withRouter } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { COLOR } from "../components/Color/Color";

class Search extends Component {
  state = {
    filterPosts: [],
    loading: false,
    searchText: "",
  };
  getsearch = () => {
    if (this.props.location.state.searchText) {
      const keyword = this.props.location.state.searchText;
      this.setState({
        loading: true,
      });
      axios
        .get(POSTS_URL + EMBEDD_URL)
        .then((res) => {
          const allPosts = res.data;
          this.setState({
            searchText: keyword,
            filterPosts: allPosts.filter(
              (f) =>
                f.title.rendered
                  .toLowerCase()
                  .includes(keyword.toLowerCase()) ||
                f.content.rendered.toLowerCase().includes(keyword.toLowerCase())
            ),
            loading: false,
          });
        })
        .catch((err) => {
          console.log("error is", err);
        });
    }
  };
  componentDidMount() {
    this.getsearch();
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.location.state.searchText !==
      this.props.location.state.searchText
    ) {
      this.getsearch();
    }
  }
  render() {
    const { searchText, filterPosts, loading } = this.state;
    return loading ? (
      <>
        <Header />
        <div className="align-content-center"
        style={{
            paddingTop: "13rem",
            paddingBottom: "13rem",
            textAlign: "center",
            background: COLOR.ThirdColor
        }}>
            <Loading />
        </div>
        <Footer />
      </>
    ) : (
      <>
        <Header />
        <div className="container">
          <h3>Search Result for {searchText}</h3>

          {filterPosts
            ? filterPosts.map((post) => (
                <div className="d-flex mb-3">
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt=""
                    width="100px"
                  />
                  <Link to={`/post/${post.slug}`}>
                    <h4 className="ml-3">{post.title.rendered}</h4>
                  </Link>
                </div>
              ))
            : null}
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(Search)