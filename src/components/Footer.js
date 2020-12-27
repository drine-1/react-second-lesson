import React, { Component } from 'react'
import { COLOR } from './Color/Color'

export default class Footer extends Component {
    render() {
        return (
            <>
                <div className="container-fluid p-3" style={{
                    background: COLOR.FourthColor
                }}>
                    <p className="text-center m-auto text-white">Copyright Drine</p>
                </div>
            </>
        )
    }
}
