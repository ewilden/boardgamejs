import React from 'react';
import { Text, View, StyleSheet, Image, processColor, ImageSourcePropType } from 'react-native';

const getColor = (rank: number, file: number) => {
    return Math.abs(rank - file) % 2 !== 0 ? 'red' : 'pink';
}

interface Props {
    width: number;
    height: number;
    spec: BoardSpec;
}

interface PieceSprite {
    node?: React.ReactNode;
    uri?: string;
    src?: ImageSourcePropType;
}

type PieceAssignment = (row: number, col: number) => (PieceSprite | undefined);

export interface SquareSpec {
    backgroundColor: string;
}

export interface BoardSpec {
    squares: SquareSpec[][];
    pieces?: PieceAssignment[];
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

    const renderPiece = (pieceCode: string) => {
        return { uri: `/images/chess-pieces/${pieceCode}.png` }
    }

    const whitePieces = (r: number, c: number) => {
        const rank = 8 - r;
        const file = c + 1;
        if (rank == 2) {
            return renderPiece('wP');
        }
        if (rank == 1) {
            if ([1, 8].includes(file)) {
                return renderPiece('wR');
            }
            if ([2, 7].includes(file)) {
                return renderPiece('wN');
            }
            if ([3, 6].includes(file)) {
                return renderPiece('wB');
            }
            if (file == 4) {
                return renderPiece('wQ');
            }
            if (file == 5) {
                return renderPiece('wK');
            }
        }
    }

    const blackPieces = (r: number, c: number) => {
        const rank = 8 - r;
        const file = c + 1;
        if (rank == 7) {
            return renderPiece('bP');
        }
        if (rank == 8) {
            if ([1, 8].includes(file)) {
                return renderPiece('bR');
            }
            if ([2, 7].includes(file)) {
                return renderPiece('bN');
            }
            if ([3, 6].includes(file)) {
                return renderPiece('bB');
            }
            if (file == 4) {
                return renderPiece('bQ');
            }
            if (file == 5) {
                return renderPiece('bK');
            }
        }
    }

    return { squares, pieces: [whitePieces, blackPieces] };
}

class Board extends React.Component<Props> {
    renderSquares() {
        const { width, height, spec } = this.props;
        const { squares, pieces } = spec;
        const boardSize = Math.min(width, height);
        const squareSize = boardSize / squares.length;

        const renderPieceSprite = (spr: PieceSprite): (React.ReactNode | void) => {
            if (spr.node) {
                return spr.node;
            }
            if (spr.uri) {
                return <Image source={{ uri: spr.uri }} style={{ width: 0.9 * squareSize, height: 0.9 * squareSize }} />
            }
        }
        return squares.map((row, rowNum) => {
            return <View style={styles.row}>{row.map((square, colNum) => {
                return <View style={[{ width: squareSize, height: squareSize, backgroundColor: square.backgroundColor }, { alignItems: 'center' }]}>
                    {pieces && pieces.map(fn => {
                        const spr = fn(rowNum, colNum);
                        if (spr) {
                            return renderPieceSprite(spr);
                        }
                    })}
                </View>;
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