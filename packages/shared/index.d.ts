/**
 * @typedef {"X" | "O"} Player
 */
export class TicTacToe {
	/**
	 * @type {ReadonlyArray<Player | null>}
	 */
	get board(): readonly (Player | null)[];
	get player(): Player;
	get winner(): Player | null;
	get turns(): number;
	get done(): boolean;
	/**
	 * @param {number} i
	 */
	get(i: number): Player | null;
	/**
	 * @param {number} i
	 */
	play(i: number): void;
	reset(): void;
	#private;
}
export type Player = "X" | "O";
