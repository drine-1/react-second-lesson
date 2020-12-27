import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import { EMBEDD_URL, POSTS_URL } from "../config/ApiEndPoint";
import { COLOR } from "./Color/Color";
import { Link } from "react-router-dom";
import Loading from "./Loading/Loading";

export default class HomeSlider extends Component {
  state = {
    posts: [],
    loading: false,
  };
  getPosts = async () => {
    this.setState({
      loading: true,
    });
    axios
      .get(POSTS_URL + EMBEDD_URL)
      .then((res) => {
        this.setState({
          posts: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log("Error is", err);
      });
  };
  componentDidMount() {
    this.getPosts();
  }
  render() {
    var settings = {
      //dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
    const postsData = this.state.posts;
    const loading = this.state.loading;
    return loading ? (
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
    ) : (
      <div>
        <Slider {...settings}>
          {postsData.map((post) => (
            <div className="position-relative" key={post.id}>
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt=""
                width="100%"
                style={{
                  height: "435px",
                  objectFit: "cover",
                }}
              />
              <div
                className="position-absolute"
                style={{
                  left: "15px",
                  bottom: "15px",
                  zIndex: 999999999,
                }}
              >
                <h3
                  className=""
                  style={{
                    color: COLOR.FirstColor,
                  }}
                >
                  {post.title.rendered}
                </h3>
                {/* <p
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  style={{ color: COLOR.FirstColor }}
                /> */}
                <Link
                  to={`/post/${post.slug}`}
                  className="text-decoration-none text-uppercase"
                  style={{ color: COLOR.FourthColor }}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
