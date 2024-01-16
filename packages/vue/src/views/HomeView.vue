<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue";
import { TicTacToe } from "shared";
import { ref } from "vue";

const game = new TicTacToe();

const title = ref("Player X");
const board = ref(game.board);
const done = ref(game.done);

function handlePlay(i: number) {
	if (game.done || game.get(i) !== null) return;

	game.play(i);

	board.value = [...game.board];
	done.value = game.done;

	if (game.turns === 9) {
		title.value = "Draw!";
	} else if (game.winner === null) {
		title.value = `Player ${game.player}`;
	} else {
		title.value = `Player ${game.player} won!`;
	}
}

function handleReset() {
	game.reset();
	board.value = [...game.board];
	done.value = game.done;
	title.value = `Player ${game.player}`;
}
</script>

<template>
	<p class="game-title">{{ title }}</p>
	<GameBoard :board="board" :done="done" @play="(i) => handlePlay(i)" />
	<button class="game-reset-btn" @click="handleReset()">Reset</button>
</template>

<style scoped>
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
