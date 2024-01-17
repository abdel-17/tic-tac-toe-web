<script lang="ts">
	import "../app.css";

	import GameBoard from "$lib/GameBoard.svelte";
	import { determineWinner, type Player } from "shared";

	let board = new Array<Player | null>(9).fill(null);
	let player: Player = "X";
	let winner: Player | null = null;
	let turns = 0;

	$: done = winner !== null || turns === 9;

	let title: string;
	$: if (turns === 9) {
		title = "Draw!";
	} else if (winner === null) {
		title = `Player ${player}`;
	} else {
		title = `Player ${player} won!`;
	}

	function handlePlay(i: number) {
		if (done || board[i] !== null) return;

		board[i] = player;
		winner = determineWinner({
			board,
			currentPlayer: player,
			lastPlayedAt: i,
		});
		player = player === "X" ? "O" : "X";
		turns++;
	}

	function handleReset() {
		board = new Array(9).fill(null);
		winner = null;
		player = "X";
		turns = 0;
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
