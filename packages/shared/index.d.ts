/**
 * @typedef {"X" | "O"} Player
 */
/**
 *
 * @typedef {Object} DetermineWinnerArgs
 * @property {ReadonlyArray<Player | null>} board
 * @property {Player} currentPlayer
 * @property {number} lastPlayedAt
 */
/**
 *
 * @param {DetermineWinnerArgs} args
 * @returns {Player | null}
 */
export function determineWinner({
	board,
	currentPlayer,
	lastPlayedAt,
}: DetermineWinnerArgs): Player | null;
export type Player = "X" | "O";
export type DetermineWinnerArgs = {
	board: ReadonlyArray<Player | null>;
	currentPlayer: Player;
	lastPlayedAt: number;
};
//# sourceMappingURL=index.d.ts.map
