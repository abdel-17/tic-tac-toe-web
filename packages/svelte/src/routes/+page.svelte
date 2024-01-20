<script lang="ts">
	import "../app.css";

	import GameBoard from "$lib/GameBoard.svelte";
	import { determineWinner, type Player } from "shared";

	let board = Array<Player | null>(9).fill(null);
	let player: Player = "X";
	let winner: Player | null = null;
	let turns = 0;

	$: done = winner !== null || turns === 9;

	let title: string;
	$: if (!done) {
		title = `Player ${player}`;
	} else if (winner !== null) {
		title = `Player ${winner} won!`;
	} else {
		title = "Draw!";
	}

	function handlePlay(i: number) {
		if (done || board[i] !== null) return;

		board[i] = player;
		winner = determineWinner({
			board,
			lastPlayedAt: i,
		});
		player = player === "X" ? "O" : "X";
		turns++;
	}

	function handleReset() {
		board = Array(9).fill(null);
		winner = null;
		player = "X";
		turns = 0;
	}
</script>

<div class="game-root">
	<p class="game-title">{title}</p>
	<GameBoard {board} {done} on:play={(e) => handlePlay(e.detail)} />
	<button class="game-reset-btn" on:click={handleReset}>Reset</button>
</div>

<style>
	.game-root {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

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
		background-color: #dc2626;
		color: white;
	}

	.game-reset-btn:hover {
		background-color: #b91c1c;
	}

	.game-reset-btn:active {
		background-color: #991b1b;
	}
</style>
