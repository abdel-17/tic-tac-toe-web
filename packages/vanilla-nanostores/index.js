import {
	atom,
	computed,
} from "https://cdn.jsdelivr.net/npm/nanostores@0.9.5/+esm";
import { determineWinner } from "../shared/index.js";

function createEmptyBoard() {
	const board = Array(9);
	for (let i = 0; i < 9; ++i) {
		board[i] = atom(null);
	}
	return board;
}

export class TicTacToe {
	board = createEmptyBoard();

	$player = atom("X");

	$winner = atom(null);

	$turns = atom(0);

	$done = computed(
		[this.$winner, this.$turns],
		(winner, turns) => winner !== null || turns === 9,
	);

	$title = computed(
		[this.$done, this.$winner, this.$player],
		(done, winner, player) => {
			if (!done) {
				return `Player ${player}`;
			} else if (winner !== null) {
				return `Player ${winner} won!`;
			} else {
				return "Draw!";
			}
		},
	);

	play(i) {
		this.board[i].set(this.$player.get());
		this.$winner.set(
			determineWinner({
				board: this.board.map(($player) => $player.get()),
				lastPlayedAt: i,
			}),
		);
		this.$player.set(this.$player.get() === "X" ? "O" : "X");
		this.$turns.set(this.$turns.get() + 1);
	}

	reset() {
		for (const $player of this.board) {
			$player.set(null);
		}
		this.$player.set("X");
		this.$winner.set(null);
		this.$turns.set(0);
	}
}
