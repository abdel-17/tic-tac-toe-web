import "./App.css";

import { determineWinner, type Player } from "shared";
import { createSignal, Index, type Component } from "solid-js";

const App: Component = () => {
	const [board, setBoard] = createSignal(
		new Array<Player | null>(9).fill(null),
	);
	const [player, setPlayer] = createSignal<Player>("X");
	const [winner, setWinner] = createSignal<Player | null>(null);
	const [turns, setTurns] = createSignal(0);

	const done = () => winner() !== null || turns() === 9;

	const title = () => {
		if (turns() === 9) {
			return "Draw!";
		} else if (winner() === null) {
			return `Player ${player()}`;
		} else {
			return `Player ${winner()} won!`;
		}
	};

	function handlePlay(i: number) {
		if (done() || board()[i] !== null) return;

		const newBoard = [...board()];
		newBoard[i] = player();
		setBoard(newBoard);

		const newWinner = determineWinner({
			board: newBoard,
			currentPlayer: player(),
			lastPlayedAt: i,
		});
		setWinner(newWinner);

		setPlayer(player() === "X" ? "O" : "X");
		setTurns(turns() + 1);
	}

	function handleReset() {
		setBoard(new Array(9).fill(null));
		setPlayer("X");
		setWinner(null);
		setTurns(0);
	}

	return (
		<div class="game-root">
			<p class="game-title">{title()}</p>
			<GameBoard board={board()} done={done()} onPlay={handlePlay} />
			<button class="game-reset-btn" onClick={handleReset}>
				Reset
			</button>
		</div>
	);
};

type GameBoardProps = {
	board: ReadonlyArray<Player | null>;
	done: boolean;
	onPlay: (i: number) => void;
};

const GameBoard: Component<GameBoardProps> = (props) => {
	return (
		<div class="game-board">
			<Index each={props.board}>
				{(player, i) => (
					<button
						aria-disabled={props.done || player() !== null}
						data-player={player()}
						class="game-cell"
						onClick={() => props.onPlay(i)}
					>
						{player()}
					</button>
				)}
			</Index>
		</div>
	);
};

export default App;
