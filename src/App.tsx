import React, { Component } from "react";
import {
  Text,
  View
} from "react-native";
import Board, { getChessBoardSpec } from "./components/board/Board";
import DimensionsAware from "./components/DimensionsAware";

class App extends Component<{}> {
  render() {
    return <View><Text> Hello App! </Text>
      <DimensionsAware render={({ windowDims }) => <Board {...windowDims} spec={getChessBoardSpec()} />} />
    </View>;
  }
}

export default App;
