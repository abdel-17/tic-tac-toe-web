import "./App.css";

import { useState } from "react";
import { determineWinner, type Player } from "shared";

function createEmptyBoard(): Array<Player | null> {
	return Array(9).fill(null);
}

export default function App() {
	const [board, setBoard] = useState(createEmptyBoard);
	const [player, setPlayer] = useState<Player>("X");
	const [winner, setWinner] = useState<Player | null>(null);
	const [turns, setTurns] = useState(0);

	const done = winner !== null || turns === 9;

	let title: string;
	if (!done) {
		title = `Player ${player}`;
	} else if (winner !== null) {
		title = `Player ${winner} won!`;
	} else {
		title = "Draw!";
	}

	function handlePlay(i: number) {
		if (done || board[i] !== null) return;

		const newBoard = [...board];
		newBoard[i] = player;
		setBoard(newBoard);

		const newWinner = determineWinner({
			board: newBoard,
			lastPlayedAt: i,
		});
		setWinner(newWinner);

		setPlayer(player === "X" ? "O" : "X");
		setTurns(turns + 1);
	}

	function handleReset() {
		setBoard(createEmptyBoard());
		setPlayer("X");
		setWinner(null);
		setTurns(0);
	}

	return (
		<div className="game-root">
			<p className="game-title">{title}</p>
			<GameBoard board={board} done={done} onPlay={handlePlay} />
			<button className="game-reset-btn" onClick={handleReset}>
				Reset
			</button>
		</div>
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
					disabled={done || player !== null}
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
