import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { VictoryChart, VictoryLine, VictoryTheme, VictoryLabel } from "victory";
import {
  standardVendorWines,
  getDays,
  getBreifVendorWinePerDays,
  getBreifVendorWinePerDaysData,
  vendorWinesToChartData
} from "./helper.js";
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }
  async componentDidMount() {
    let response = await fetch(
      "http://vy.com.hk/shop/wineHistory?wineId=205&vintage=2014"
    );
    let data = await response.json();
    this.setState({ data: vendorWinesToChartData(data) });
  }
  render() {
    if (this.state.data == null) {
      return <div>Loading</div>;
    }
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" }
          }}
          domain={{ y: [0, 20000] }}
          labels={datum => parseInt(datum.y)}
          labelComponent={<VictoryLabel renderInPortal />}
          data={this.state.data}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
      </VictoryChart>
    );
  }
}

export default App;
