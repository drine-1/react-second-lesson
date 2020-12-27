import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { POSTS_URL } from "../config/ApiEndPoint";
import Loading from "../components/Loading/Loading";
import { COLOR } from "../components/Color/Color";
import { Link, withRouter } from "react-router-dom";
import { GiCancel } from 'react-icons/gi'

class Category extends Component {
  state = {
    categoryPosts: [],
    loading: false,
    title: '',
    searchText: ''
  };
  getCategoryPosts = () => {
    const state = this.props.location.state
    const id = this.props.match.params.id;
    this.setState({
      loading: true,
    });
    axios
      .get(POSTS_URL + `?categories=${id}&_embed=1`)
      .then((res) => {
        this.setState({
          categoryPosts: res.data,
          loading: false,
        });
        if(state){
            this.setState({
                title:state.title
            })
        }
      })
      .catch((err) => {
        console.log("errorrr is", err);
      });
  };
  componentDidMount() {
    this.getCategoryPosts();
  }
  render() {
    const { categoryPosts, loading, title } = this.state;
    const filterPosts = categoryPosts.filter( f => f.title.rendered.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1)

    const returnPosts = filterPosts.length ? (
        <div className="row p-3">
            {filterPosts.map( catPosts => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={catPosts.id}>
                  <div className="shadow rounded">
                      <img src={catPosts._embedded["wp:featuredmedia"][0].source_url} alt="" className="w-100"/>
                  
                  <div className="bg-white p-4">
                      <h5>
                          {catPosts.title.rendered}
                      </h5>
                      <p className="overflow-hidden"
                      style={{
                          display: '-webkit-box',
                          WebkitLineClamp:2,
                          WebkitBoxOrient:'vertical'
                      }}
                      dangerouslySetInnerHTML={{__html:catPosts.content.rendered}}/>
                      <Link to={`/post/${catPosts.slug}`} >Read More</Link>
                  </div>
              </div>

            </div>
            ))
          }
        
        </div>
        ): <h6 className="text-black-50">No data found</h6>

        const inputSearch = (
            <div className="d-flex shadow rounded-lg mt-4 mb-3">
                <input className="form-control shadow-none rounded-0 border-0" type="text" placeholder="Search"  
                style={{
                    height: '45px'
                }} 
                value={this.state.searchText}
                onChange={(e) => this.setState({
                    searchText: e.target.value
                })}/>
                {
                    this.state.searchText.length >= 3 ? (
                        <button
                        className="btn btn-dark border-0 rounded-0 shadow-none"
                        onClick={() => (
                            this.setState(
                                {searchText: ''}
                                )
                        )}
                        ><GiCancel size="1.2rem" /></button>
                    ) : null
                }
            </div>
        )
    return  (
      <>
        <Header />
        <div className="container">
          <h3 className="text-black-50">{title}</h3>
          {inputSearch}
          {loading ? (
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
          ) : returnPosts
        }
        </div>
        <Footer />
      </>
    
    )
  }
}

export default withRouter(Category)