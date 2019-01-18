import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const getColor = (rank: number, file: number) => {
    return Math.abs(rank - file) % 2 !== 0 ? 'red' : 'pink';
}

type Props = {
    windowDims: {
        width: number,
        height: number,
    }
}

class Board extends React.Component<Props> {
    renderSquares() {
        const { width, height } = this.props.windowDims;
        const boardSize = Math.min(width, height);
        const squares = [];
        for (let rank = 0; rank < 8; rank++) {
            const row = [];
            for (let file = 0; file < 8; file++) {
                const square = (<View
                    style={{
                        width: boardSize / 8,
                        height: boardSize / 8,
                        backgroundColor: getColor(rank, file),
                    }}>
                    <Text>Hi</Text>
                </View >)
                row.push(square);
            }
            squares.push(<View style={styles.row}>{row}</View>)
        }
        return squares;
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