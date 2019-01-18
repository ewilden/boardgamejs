import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const getColor = (rank: number, file: number) => {
    return Math.abs(rank - file) % 2 !== 0 ? 'red' : 'pink';
}

interface Props {
    width: number,
    height: number,
    spec: BoardSpec,
}

export interface SquareSpec {
    backgroundColor: string,
    pieceImageSrc?: string,
}

export interface BoardSpec {
    squares: SquareSpec[][],
}

export function getChessBoardSpec(): BoardSpec {
    const squares = [];
    for (let rank = 0; rank < 8; rank++) {
        const row = [];
        for (let file = 0; file < 8; file++) {
            row.push({
                backgroundColor: getColor(rank, file),
            });
        }
        squares.push(row);
    }
    return { squares };
}

class Board extends React.Component<Props> {
    renderSquares() {
        const { width, height, spec } = this.props;
        const { squares } = spec;
        const boardSize = Math.min(width, height);
        const squareSize = boardSize / squares.length;
        return squares.map(row => {
            return <View style={styles.row}>{row.map(square => {
                return <View style={{ width: squareSize, height: squareSize, backgroundColor: square.backgroundColor }}><Text>Hi</Text></View>;
            })}</View>;
        });
    }

    render() {
        return < View style={[styles.container]} >
            <View>
                {this.renderSquares()}
            </View>
        </View >
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
});

export default Board;