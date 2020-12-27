import axios from "axios";
import React, { Component } from "react";
import { EMBEDD_URL, POSTS_URL } from "../config/ApiEndPoint";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { COLOR } from "../components/Color/Color";
import Moment from "react-moment";
import Loading from "../components/Loading/Loading";

export default class SinglePostTemplate extends Component {
  state = {
    post: null,
    relatedPosts: [],
    loading: false,
  };
  getPost = async () => {
    const slug = this.props.match.params.slug;
    this.setState({
      loading: true,
    });
    axios
      .get(`${POSTS_URL}?slug=${slug}&_embed=1`)
      .then((res) => {
        this.setState({
          post: res.data[0],
          loading: false,
        });
      })
      .catch((err) => {
        console.log("error is", err);
      });
    window.scrollTo(0, 0);
  };
  getRelatedPosts = async () => {
    axios
      .get(POSTS_URL + EMBEDD_URL)
      .then((res) => {
        this.setState({
          relatedPosts: res.data,
        });
      })
      .catch((err) => {
        console.log("error is", err);
      });
  };
  componentDidMount() {
    this.getPost();
    this.getRelatedPosts();
  }
  componentDidUpdate(prevProps) {
    const prev = prevProps.match.params.slug;
    const next = this.props.match.params.slug;
    if (prev !== next) {
      this.getPost();
    }
  }

  render() {
    const { post, relatedPosts, loading } = this.state;
    return loading ? (
      <>
        <Header />
        <div
          className="align-content-center"
          style={{
            paddingTop: "13rem",
            paddingBottom: "13rem",
            textAlign: "center",
            background: COLOR.ThirdColor,
          }}
        >
          <Loading />
        </div>
        <Footer />
      </>
    ) : (
      <>
        <Header />

        <div className="container">
          {/* {loading && (
            <div
              style={{
                background: COLOR.ThirdColor,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                textAlign: "center",
              }}
            >
              <div className="d-table w-100 h-100">
                <div className="d-table-cell align-middle">
                  <p className="text-white">Loading ...</p>
                </div>
              </div>
            </div>
          )} */}

          {post ? (
            <div>
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt=""
                width="100%"
                className="pt-2"
              />
              <h4 className="pt-3 pb-3 mb-0">{post.title.rendered}</h4>
              <small>
                <Moment fromNow>{post.date}</Moment>
              </small>
              <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </div>
          ) : null}
          <div className="mt-5 pt-5 border-top">
            <h3>Related Posts</h3>
            <div className="row">
              {relatedPosts
                ? relatedPosts
                    .filter((f) => (post ? post.id : null) !== f.id)
                    .map((rpost) => (
                      <div className="col-12 col-sm-6 col-md-3">
                        {/* {console.log("aaaaaaaa", rpost.title.rendered)} */}
                        <Link to={`/post/${rpost.slug}`}>
                          <img
                            src={
                              rpost._embedded["wp:featuredmedia"][0].source_url
                            }
                            alt=""
                            width="100%"
                          />
                        </Link>
                        <Link
                          to={`/post/${rpost.slug}`}
                          className="text-decoration-none"
                        >
                          <h3
                            onClick={() =>
                              this.props.history.push(`/post/${rpost.slug}`)
                            }
                          >
                            {rpost.title.rendered}
                          </h3>
                        </Link>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: rpost.excerpt.rendered.slice(0, 46),
                          }}
                        />
                        <Link
                          to={`/post/${rpost.slug}`}
                          className="text-info text-decoration-none"
                        >
                          Read More
                        </Link>
                      </div>
                    ))
                : null}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
