<script setup lang="ts">
import GameBoard from "@/components/GameBoard.vue";
import { determineWinner, type Player } from "shared";
import { computed, ref } from "vue";

const board = ref(new Array<Player | null>(9).fill(null));
const player = ref<Player>("X");
const winner = ref<Player | null>(null);
const turns = ref(0);

const done = computed(() => winner.value !== null || turns.value === 9);

const title = computed(() => {
	if (winner.value === null) {
		return `Player ${player.value}`;
	} else if (winner.value === "X") {
		return "Player X won!";
	} else {
		return "Player O won!";
	}
});

function handlePlay(i: number) {
	if (done.value || board.value[i] !== null) return;

	board.value[i] = player.value;
	winner.value = determineWinner({
		board: board.value,
		currentPlayer: player.value,
		lastPlayedAt: i,
	});
	player.value = player.value === "X" ? "O" : "X";
	turns.value++;
}

function handleReset() {
	board.value = new Array(9).fill(null);
	winner.value = null;
	player.value = "X";
	turns.value = 0;
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
