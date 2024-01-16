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
export function determineWinner({ board, currentPlayer, lastPlayedAt }) {
	//  0 | 1 | 2
	// ---|---|---
	//  3 | 4 | 5
	// ---|---|---
	//  6 | 7 | 8

	const row = Math.floor(lastPlayedAt / 3);
	const column = lastPlayedAt % 3;

	// Check the row triplet
	if (areEqual(board[3 * row], board[3 * row + 1], board[3 * row + 2])) {
		return currentPlayer;
	}

	// Check the column triplet
	if (areEqual(board[column], board[column + 3], board[column + 6])) {
		return currentPlayer;
	}

	// Check the diagonal triplets
	if (row === column && areEqual(board[0], board[4], board[8])) {
		return currentPlayer;
	}

	if (row + column === 2 && areEqual(board[2], board[4], board[6])) {
		return currentPlayer;
	}

	return null;
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @param {unknown} c
 */
function areEqual(a, b, c) {
	return a === b && b === c;
}
