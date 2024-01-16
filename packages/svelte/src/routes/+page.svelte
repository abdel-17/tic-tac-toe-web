<script lang="ts">
	import { TicTacToe } from "shared";
	import "../app.css";
	import GameBoard from "./GameBoard.svelte";

	const game = new TicTacToe();

	let title = "Player X";
	let board = game.board;
	let done = game.done;

	function handlePlay(i: number) {
		if (game.done || game.get(i) !== null) return;

		game.play(i);

		board = game.board;
		done = game.done;

		if (game.turns === 9) {
			title = "Draw!";
		} else if (game.winner === null) {
			title = `Player ${game.player}`;
		} else {
			title = `Player ${game.player} won!`;
		}
	}

	function handleReset() {
		game.reset();
		board = game.board;
		done = game.done;
		title = `Player ${game.player}`;
	}
</script>

<p class="game-title">{title}</p>
<GameBoard {board} {done} on:play={(e) => handlePlay(e.detail)} />
<button class="game-reset-btn" on:click={handleReset}>Reset</button>

<style>
	.game-title {
		font-size: 1.5rem;
		margin: 0;
		margin-bottom: 1.5rem;
	}

	.game-reset-btn {
		appearance: none;
		border: none;
		margin-top: 2rem;
		height: 2rem;
		padding: 0 1rem;
		border-radius: 0.25rem;
		background-color: var(--btn-error-bg);
		color: white;
	}

	.game-reset-btn:hover {
		background-color: var(--btn-error-hover-bg);
	}

	.game-reset-btn:active {
		background-color: var(--btn-error-active-bg);
	}
</style>
