import React, { Component } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default class NotFound extends Component {
    render() {
        return (
           <>
           <Header />
           <div className="container"
           style={{
            paddingTop: "11rem",
            paddingBottom: "11rem",
            textAlign: "center",
           }}>
                <h4>404 Not Found</h4>
                <h1>The page you requested is not available</h1>
            </div>
           <Footer />
           </>
        )
    }
}
