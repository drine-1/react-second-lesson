import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CATEGORIES_URL, EMBEDD_URL } from "../config/ApiEndPoint";
import axios from "axios";
import { COLOR } from "../components/Color/Color";
import Loading from "../components/Loading/Loading";
import { Link, withRouter } from "react-router-dom";
import Category from "./Category";

class Categories extends Component {
  state = {
    categories: [],
    loading: false,
  };
  getCategories = async () => {
    this.setState({
      loading: true,
    });
    axios
      .get(CATEGORIES_URL + EMBEDD_URL)
      .then((res) => {
        this.setState({
          categories: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log("error is", err);
      });
  };
  componentDidMount() {
    this.getCategories();
    window.scrollTo(0, 0);
  }
  render() {
    const { categories, loading } = this.state;
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
        <div className="container-fluid">
          <h4 className="pt-2">All Categories</h4>
          <div className="row pb-3">
            {categories.sort((a,b) => {
              if ( a.name > b.name ) return -1
              return 0
            }).map((cat) => (
              <div className="col-12 col-sm-6 col-md-3 col-lg-3" key={cat.id}>
                <div className="position-relative shadow rounded">
                  <img
                    src={cat.acf.category_image.url}
                    alt=""
                    width="100%"
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      this.props.history.push({
                        pathname: `/category/${cat.id}`,
                        state: {
                          title: cat.name,
                        },
                      });
                    }}
                  />

                  <h5
                    className="position-absolute text-white"
                    style={{
                      left: "10px",
                      bottom: "3px",
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      this.props.history.push({
                        pathname: `/category/${cat.id}`,
                        state: {
                          title: cat.name,
                        },
                      });
                    }}
                  >
                    {cat.name}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(Categories);
