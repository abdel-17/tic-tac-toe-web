/**
 * @typedef {"X" | "O"} Player
 */
/**
 *
 * @typedef {Object} DetermineWinnerArgs
 * @property {ReadonlyArray<Player | null>} board
 * @property {number} lastPlayedAt
 */
/**
 *
 * @param {DetermineWinnerArgs} args
 * @returns {Player | null}
 */
export function determineWinner({ board, lastPlayedAt }: DetermineWinnerArgs): Player | null;
export type Player = "X" | "O";
export type DetermineWinnerArgs = {
    board: ReadonlyArray<Player | null>;
    lastPlayedAt: number;
};
//# sourceMappingURL=index.d.ts.map