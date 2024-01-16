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
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: var(--board-border-size);
	background-color: var(--board-border);
	border: var(--board-border-size) solid var(--board-border);
}

.game-cell {
	appearance: none;
	border: none;
	cursor: pointer;
	width: 4rem;
	height: 4rem;
	font-size: 3rem;
	background-color: var(--board-bg);
	transition: background-color 0.2s ease-out;
}

.game-cell[data-player="X"] {
	background-color: var(--x-bg);
}

.game-cell[data-player="O"] {
	background-color: var(--o-bg);
}

.game-cell[aria-disabled="true"] {
	cursor: default;
}
</style>
