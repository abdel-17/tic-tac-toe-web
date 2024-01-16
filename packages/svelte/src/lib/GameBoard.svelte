<script lang="ts">
	import type { Player } from "shared";
	import { createEventDispatcher } from "svelte";

	export let board: ReadonlyArray<Player | null>;
	export let done: boolean;

	const dispatch = createEventDispatcher<{
		play: number;
	}>();
</script>

<div class="game-board">
	{#each board as player, i}
		<button
			aria-disabled={done || player !== null}
			data-player={player}
			class="game-cell"
			on:click={() => dispatch("play", i)}
		>
			{player ?? ""}
		</button>
	{/each}
</div>

<style>
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
