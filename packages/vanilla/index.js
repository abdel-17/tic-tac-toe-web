import { determineWinner } from "../shared/index.js";

export class TicTacToe {
	#board = Array(9).fill(null);

	#player = "X";

	#winner = null;

	#turns = 0;

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

	get(i) {
		return this.#board[i];
	}

	play(i) {
		this.#board[i] = this.#player;
		this.#winner = determineWinner({
			board: this.#board,
			currentPlayer: this.#player,
			lastPlayedAt: i,
		});
		this.#player = this.#player === "X" ? "O" : "X";
		this.#turns++;
	}

	reset() {
		for (let i = 0; i < 9; ++i) {
			this.#board[i] = null;
		}
		this.#player = "X";
		this.#winner = null;
		this.#turns = 0;
	}
}
