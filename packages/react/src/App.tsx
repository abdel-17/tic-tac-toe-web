import "./App.css";

import { useRef, useState } from "react";
import { type Player, TicTacToe } from "shared";

function useTicTacToe(): TicTacToe {
	const gameRef = useRef<TicTacToe | null>(null);
	if (gameRef.current === null) {
		gameRef.current = new TicTacToe();
	}
	return gameRef.current;
}

export default function App() {
	const game = useTicTacToe();
	const [title, setTitle] = useState("Player X");
	const [board, setBoard] = useState(game.board);
	const [done, setDone] = useState(game.done);

	function handlePlay(i: number) {
		if (game.done || game.get(i) !== null) return;

		game.play(i);

		setBoard([...game.board]);
		setDone(game.done);

		if (game.turns === 9) {
			setTitle("Draw!");
		} else if (game.winner === null) {
			setTitle(`Player ${game.player}`);
		} else {
			setTitle(`Player ${game.player} won!`);
		}
	}

	function handleReset() {
		game.reset();
		setBoard([...game.board]);
		setDone(game.done);
		setTitle(`Player ${game.player}`);
	}

	return (
		<>
			<p className="game-title">{title}</p>
			<GameBoard board={board} done={done} onPlay={handlePlay} />
			<button className="game-reset-btn" onClick={handleReset}>
				Reset
			</button>
		</>
	);
}

type GameBoardProps = {
	board: ReadonlyArray<Player | null>;
	done: boolean;
	onPlay: (i: number) => void;
};

function GameBoard({ board, done, onPlay }: GameBoardProps) {
	return (
		<div className="game-board">
			{board.map((player, i) => (
				<button
					key={i}
					aria-disabled={done || player !== null}
					data-player={player}
					className="game-cell"
					onClick={() => onPlay(i)}
				>
					{player}
				</button>
			))}
		</div>
	);
}
