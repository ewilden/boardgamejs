import React, { Component } from "react";
import {
  View
} from "react-native";
import Board, { BoardSpec } from "./components/board/Board";
import { getChessSpec, ChessPieceData } from "./game-specs/ChessSpec";
import DimensionsAware from "./components/DimensionsAware";
import ChessContainer from "./components/board/ChessContainer";


class App extends Component<{}> {

  render() {
    return <View>
      <DimensionsAware render={({ windowDims }) => <ChessContainer {...windowDims} />} />
    </View>;
  }
}

export default App;
