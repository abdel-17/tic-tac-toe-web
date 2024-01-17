<script setup lang="ts">
import type { Player } from "shared";

defineProps<{
	board: ReadonlyArray<Player | null>;
	done: boolean;
}>();

defineEmits<{
	(e: "play", i: number): void;
}>();
</script>

<template>
	<div class="game-board">
		<button
			v-for="(player, i) in board"
			:key="i"
			:aria-disabled="done || player !== null"
			:data-player="player"
			class="game-cell"
			@click="() => $emit('play', i)"
		>
			{{ player }}
		</button>
	</div>
</template>

<style scoped>
.game-board {
	--border-size: 0.25rem;
	--border-color: black;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: var(--border-size);
	background-color: var(--border-color);
	border: var(--border-size) solid var(--border-color);
}

.game-cell {
	appearance: none;
	border: none;
	cursor: pointer;
	width: 4rem;
	height: 4rem;
	font-size: 3rem;
	background-color: white;
	transition: background-color 0.2s ease-out;
}

.game-cell[data-player="X"] {
	background-color: #f87171;
}

.game-cell[data-player="O"] {
	background-color: #38bdf8;
}

.game-cell[aria-disabled="true"] {
	cursor: default;
}
</style>
