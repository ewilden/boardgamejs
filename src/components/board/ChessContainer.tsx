import React from 'react';
import Board, { BoardSpec, Piece, clonePieceAssignmentFrom } from './Board';
import { ChessPieceData, getChessSpec } from '../../game-specs/ChessSpec';

interface Props {
    width: number;
    height: number;
}

interface State {
    boardSpec: BoardSpec<ChessPieceData>;
    holdingPiece: undefined | {
        row: number,
        col: number,
        piece: Piece<ChessPieceData>,
    };
}

class ChessContainer extends React.Component<Props, State> {
    state = {
        boardSpec: getChessSpec(),
        holdingPiece: undefined,
    }
    handleClickSquare = (row: number, col: number, spec: BoardSpec<ChessPieceData>) => {
        this.setState((currState) => {
            const { boardSpec, holdingPiece } = currState;
            if (holdingPiece) {
                const nextPieces = clonePieceAssignmentFrom(boardSpec.pieces);
                nextPieces.removePiece(holdingPiece.row, holdingPiece.col);
                nextPieces.putPiece(row, col, holdingPiece.piece);
                const nextSpec = {
                    squares: currState.boardSpec.squares,
                    pieces: nextPieces,
                };
                return {
                    boardSpec: nextSpec,
                    holdingPiece: undefined,
                }
            } else {
                const pickedUpPiece = boardSpec.pieces.getPiece(row, col);
                const nextHoldingPiece = pickedUpPiece ? {
                    row,
                    col,
                    piece: pickedUpPiece,
                } : undefined;
                return {
                    boardSpec,
                    holdingPiece: nextHoldingPiece,
                }
            }
        })
    }

    render() {
        return <Board {...this.props} spec={this.state.boardSpec} onClickSquare={this.handleClickSquare} />;
    }
}
export default ChessContainer;