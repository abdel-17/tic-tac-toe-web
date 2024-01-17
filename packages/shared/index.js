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
	if (allEqual(board[3 * row], board[3 * row + 1], board[3 * row + 2])) {
		return currentPlayer;
	}

	// Check the column triplet
	if (allEqual(board[column], board[column + 3], board[column + 6])) {
		return currentPlayer;
	}

	// Check the diagonal triplets
	if (row === column && allEqual(board[0], board[4], board[8])) {
		return currentPlayer;
	}

	if (row + column === 2 && allEqual(board[2], board[4], board[6])) {
		return currentPlayer;
	}

	return null;
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @param {unknown} c
 */
function allEqual(a, b, c) {
	return a === b && b === c;
}
