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
	if (turns.value === 9) {
		return "Draw";
	} else if (winner.value === null) {
		return `Player ${player.value}`;
	} else {
		return `Player ${winner.value} won!`;
	}
});

function handlePlay(i: number) {
	if (done.value || board.value[i] !== null) return;

	board.value[i] = player.value;
	winner.value = determineWinner({
		board: board.value,
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
	<div class="game-root">
		<p class="game-title">{{ title }}</p>
		<GameBoard :board="board" :done="done" @play="(i) => handlePlay(i)" />
		<button class="game-reset-btn" @click="handleReset()">Reset</button>
	</div>
</template>

<style scoped>
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
