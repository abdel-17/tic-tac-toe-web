/**
 * @typedef {"X" | "O"} Player
 */

export class TicTacToe {
	/**
	 * @type {Array<Player | null>}
	 */
	#board = Array(9).fill(null);

	/**
	 * @type {Player}
	 */
	#player = "X";

	/**
	 * @type {Player | null}
	 */
	#winner = null;

	#turns = 0;

	/**
	 * @type {ReadonlyArray<Player | null>}
	 */
	get board() {
		return this.#board;
	}

	get player() {
		return this.#player;
	}

	get winner() {
		return this.#winner;
	}

	get turns() {
		return this.#turns;
	}

	get done() {
		return this.#winner !== null || this.#turns === 9;
	}

	/**
	 * @param {number} i
	 */
	get(i) {
		invariant(0 <= i && i < 9, `Position ${i} is invalid`);
		return this.#board[i];
	}

	/**
	 * @param {number} i
	 */
	play(i) {
		invariant(this.get(i) === null, `Position ${i} is occupied`);

		this.#board[i] = this.#player;
		if (this.#hasWinner(i)) {
			this.#winner = this.#player;
		}
		this.#player = this.#player === "X" ? "O" : "X";
		this.#turns++;
	}

	/**
	 * @param {number} i
	 */
	#hasWinner(i) {
		//  0 | 1 | 2
		// ---|---|---
		//  3 | 4 | 5
		// ---|---|---
		//  6 | 7 | 8

		const row = Math.floor(i / 3);
		const column = i % 3;

		// Check the row triplet
		if (
			areEqual(this.get(3 * row), this.get(3 * row + 1), this.get(3 * row + 2))
		) {
			return true;
		}

		// Check the column triplet
		if (
			areEqual(this.get(column), this.get(column + 3), this.get(column + 6))
		) {
			return true;
		}

		// Check the diagonal triplets
		if (row === column) {
			return areEqual(this.get(0), this.get(4), this.get(8));
		}

		if (row + column === 2) {
			return areEqual(this.get(2), this.get(4), this.get(6));
		}

		return false;
	}

	reset() {
		for (let i = 0; i < 9; i++) {
			this.#board[i] = null;
		}
		this.#player = "X";
		this.#winner = null;
		this.#turns = 0;
	}
}

/**
 * @param {boolean} condition
 * @param {string} message
 * @returns {asserts condition}
 */
function invariant(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

/**
 * @param {unknown} a
 * @param {unknown} b
 * @param {unknown} c
 */
function areEqual(a, b, c) {
	return a === b && b === c;
}
