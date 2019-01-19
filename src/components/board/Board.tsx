import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, TouchableHighlight } from 'react-native';

interface Props<PieceData> {
    width: number;
    height: number;
    spec: BoardSpec<PieceData>;
    onClickSquare?: (row: number, col: number, spec: BoardSpec<PieceData>) => void
}

export interface PieceSprite {
    node?: React.ReactNode;
    uri?: string;
    src?: ImageSourcePropType;
}

export interface Piece<PieceData> {
    sprite: PieceSprite;
    data: PieceData;
}

export type CoordKey = string;

export class PieceAssignment<PieceData> {
    static coordsToKey = (row: number, col: number): CoordKey => {
        return `${row},${col}`
    }
    static keyToCoords = (key: CoordKey): [number, number] => {
        const [row, col] = key.split(',');
        return [parseInt(row, 10), parseInt(col, 10)];
    }
    mapping: Map<String, (Piece<PieceData> | undefined)> = new Map();
    putPiece(row: number, col: number, piece: Piece<PieceData>): void {
        this.mapping.set(PieceAssignment.coordsToKey(row, col), piece);
    }
    removePiece(row: number, col: number): void {
        this.mapping.delete(PieceAssignment.coordsToKey(row, col));
    }
    getPiece(row: number, col: number): Piece<PieceData> | undefined {
        return this.mapping.get(PieceAssignment.coordsToKey(row, col));
    }
}

export interface SquareSpec {
    backgroundColor: string;
}

export interface BoardSpec<PieceData> {
    squares: SquareSpec[][];
    pieces?: PieceAssignment<PieceData>;
}

class Board<PieceData> extends React.Component<Props<PieceData>> {
    renderSquares() {
        const { width, height, spec } = this.props;
        const { squares, pieces } = spec;
        const boardSize = Math.min(width, height, 600);
        const squareSize = boardSize / squares.length;

        const renderPieceSprite = (spr: PieceSprite): (React.ReactNode | undefined) => {
            if (spr.node) {
                return spr.node;
            }
            if (spr.src) {
                return <Image source={spr.src} style={{ width: 0.9 * squareSize, height: 0.9 * squareSize }} />;
            }
            if (spr.uri) {
                return <Image source={{ uri: spr.uri }} style={{ width: 0.9 * squareSize, height: 0.9 * squareSize, margin: 0.05 * squareSize }} />
            }
        }
        return squares.map((row, rowNum) => {
            return <View style={styles.row}>{row.map((square, colNum) => {
                const piece = pieces && pieces.getPiece(rowNum, colNum);
                return <TouchableHighlight onPress={() => this.props.onClickSquare && this.props.onClickSquare(rowNum, colNum, spec)}>
                    <View style={[{ width: squareSize, height: squareSize, backgroundColor: square.backgroundColor }]}>
                        {piece && renderPieceSprite(piece.sprite)}
                    </View>
                </TouchableHighlight>;
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