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
