import { determineWinner } from "../shared/index.js";

/**
 * @typedef {import("../shared/index.js").Player} Player
 */

export class TicTacToe {
	/**
	 * @type {Array<Player | null>}
	 */
	board = Array(9).fill(null);

	/**
	 * @type {Player}
	 */
	player = "X";

	/**
	 * @type {Player | null}
	 */
	winner = null;

	turns = 0;

	get done() {
		return this.winner !== null || this.turns === 9;
	}

	/**
	 * @param {number} i
	 */
	play(i) {
		this.board[i] = this.player;
		this.winner = determineWinner({
			board: this.board,
			lastPlayedAt: i,
		});
		this.player = this.player === "X" ? "O" : "X";
		this.turns++;
	}

	reset() {
		for (let i = 0; i < 9; ++i) {
			this.board[i] = null;
		}
		this.player = "X";
		this.winner = null;
		this.turns = 0;
	}
}
