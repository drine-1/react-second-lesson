import React, { Component } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { COLOR } from "../Color/Color";

export default class Loading extends Component {
  render() {
    const loadingCss = {
      center: {
        background: COLOR.ThirdColor,
      },
    };
    return (
        <PulseLoader
          css={loadingCss.center}
          size={10}
          color={"#ffffff"}
        ></PulseLoader>
    );
  }
}
