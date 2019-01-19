import { Piece, PieceAssignment, PieceSprite, BoardSpec } from '../components/board/Board';

export interface ChessPieceData {
    color: "white" | "black";
    kind: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
}
export const getChessSpec: (() => BoardSpec<ChessPieceData>) = () => getChessBoardSpec();

function getChessBoardSpec(): BoardSpec<ChessPieceData> {
    const getColor = (rank: number, file: number) => {
        return Math.abs(rank - file) % 2 !== 0 ? 'brown' : 'tan';
    }

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

    const renderPiece = (pieceCode: string): PieceSprite => {
        return { uri: `/images/chess-pieces/${pieceCode}.png` }
    }

    const whitePieces = (r: number, c: number): Piece<ChessPieceData> | undefined => {
        const rank = 8 - r;
        const file = c + 1;

        if (rank == 2) {
            return {
                sprite: renderPiece('wP'),
                data: {
                    color: "white",
                    kind: "pawn",
                },
            };
        }
        if (rank == 1) {
            if ([1, 8].includes(file)) {
                return {
                    sprite: renderPiece('wR'),
                    data: {
                        color: "white",
                        kind: "rook",
                    },
                };
            }
            if ([2, 7].includes(file)) {
                return {
                    sprite: renderPiece('wN'),
                    data: {
                        color: "white",
                        kind: "knight",
                    },
                };
            }
            if ([3, 6].includes(file)) {
                return {
                    sprite: renderPiece('wB'),
                    data: {
                        color: "white",
                        kind: "bishop",
                    },
                };
            }
            if (file == 4) {
                return {
                    sprite: renderPiece('wQ'),
                    data: {
                        color: "white",
                        kind: "queen",
                    },
                };
            }
            if (file == 5) {
                return {
                    sprite: renderPiece('wK'),
                    data: {
                        color: "white",
                        kind: "king",
                    },
                };
            }
        }
    }

    const blackPieces = (r: number, c: number): Piece<ChessPieceData> | undefined => {
        const rank = 8 - r;
        const file = c + 1;
        if (rank == 7) {
            return {
                sprite: renderPiece('bP'),
                data: {
                    color: "black",
                    kind: "pawn",
                },
            };
        }
        if (rank == 8) {
            if ([1, 8].includes(file)) {
                return {
                    sprite: renderPiece('bR'),
                    data: {
                        color: "black",
                        kind: "pawn",
                    },
                };
            }
            if ([2, 7].includes(file)) {
                return {
                    sprite: renderPiece('bN'),
                    data: {
                        color: "black",
                        kind: "pawn",
                    },
                };
            }
            if ([3, 6].includes(file)) {
                return {
                    sprite: renderPiece('bB'),
                    data: {
                        color: "black",
                        kind: "pawn",
                    },
                };
            }
            if (file == 4) {
                return {
                    sprite: renderPiece('bQ'),
                    data: {
                        color: "black",
                        kind: "pawn",
                    },
                };
            }
            if (file == 5) {
                return {
                    sprite: renderPiece('bK'),
                    data: {
                        color: "black",
                        kind: "pawn",
                    },
                };
            }
        }
    }

    const pieces = new PieceAssignment<ChessPieceData>();
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const whitePiece = whitePieces(r, c);
            whitePiece && pieces.putPiece(r, c, whitePiece);
            const blackPiece = blackPieces(r, c);
            blackPiece && pieces.putPiece(r, c, blackPiece);
        }
    }

    return { squares, pieces };
}