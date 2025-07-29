export const to2DArray = (arr: CellValue[], chunkSize: number): CellValue[][] =>
  Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
    arr.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
export const isBoardEmpty = (
  arr: (CellValue | string | null | undefined)[][]
): boolean => {
  return arr.every((row) =>
    row.every((cell) => cell === "" || cell === null || cell === undefined)
  );
};
export const isGameOverCheck = (
  gameArray: CellValue[]
): UniformResult<CellValue> | false => {
  const game2DArray: CellValue[][] = to2DArray(gameArray, 3);
  return isGameOver(game2DArray);
};
export const isGameOver = (
  gameArray: CellValue[][]
): UniformResult<CellValue> | false => {
  let resultGameOver: UniformResult<CellValue>[] =
    getUniformsWithValues(gameArray);
  if (resultGameOver.length > 0) {
    return resultGameOver[0];
  }
  return false;
};
export type LineType =
  | "TG"
  | "row1"
  | "row2"
  | "row3"
  | "col1"
  | "col2"
  | "col3"
  | "LD"
  | "RD";
export type CellValue = "o" | "x" | "t" | "";
export interface UniformResult<T> {
  type: LineType; // "row1", "col2", "LD", "RD", etc.
  value: T;
}
const getUniformsWithValues = (
  matrix: CellValue[][]
): UniformResult<CellValue>[] => {
  const result: UniformResult<CellValue>[] = [];

  const size = matrix.length;

  //  Check rows
  matrix.forEach((row, i) => {
    if (row.every((cell) => cell === row[0]) && row[0] !== "") {
      result.push({
        type: `row${i + 1}` as LineType,
        value: row[0] as CellValue,
      });
    }
  });

  //  Check columns
  for (let col = 0; col < size; col++) {
    const first = matrix[0][col];
    let isUniform = true;
    for (let row = 1; row < size; row++) {
      if (matrix[row][col] !== first) {
        isUniform = false;
        break;
      }
    }
    if (isUniform && first !== "") {
      result.push({
        type: `col${col + 1}` as LineType,
        value: first as CellValue,
      });
    }
  }

  //  Left Diagonal
  const leftDiagonalValue = matrix[0][0];
  if (
    matrix.every((row, i) => row[i] === leftDiagonalValue) &&
    leftDiagonalValue !== ""
  ) {
    result.push({
      type: "LD",
      value: leftDiagonalValue as CellValue,
    });
  }

  //  Right Diagonal
  const rightDiagonalValue = matrix[0][size - 1];
  if (
    matrix.every((row, i) => row[size - 1 - i] === rightDiagonalValue) &&
    rightDiagonalValue !== ""
  ) {
    result.push({
      type: "RD",
      value: rightDiagonalValue as CellValue,
    });
  }

  // tied
  if (result.length < 1) {
    const allNotEmpty = (array: CellValue[][]): boolean => {
      return array.every((row) => row.every((cell) => cell.trim() !== ""));
    };
    if (allNotEmpty(matrix)) {
      result.push({
        type: "TG",
        value: "t",
      });
    }
  }

  return result;
};

export const easyPlayerVsComputer = async (
  cellValues: CellValue[][],
  valueToInsert: CellValue
): Promise<CellValue[][]> => {
  let emptyIndexes: number[] = [];
  let flatCellValues = cellValues.flat();
  flatCellValues.forEach((cell: CellValue, index: number) => {
    if (cell === "") emptyIndexes.push(index);
  });
  const max = Math.max(...emptyIndexes);
  const min = Math.min(...emptyIndexes);
  let randomIndex = getRandomInRange(min, max);
  while (!emptyIndexes.includes(randomIndex))
    randomIndex = getRandomInRange(min, max);
  flatCellValues[randomIndex] = valueToInsert;
  await delay(1000);
  return to2DArray(flatCellValues, 3);
};
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const getRandomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type Player = "X" | "O" | "";
type Board = CellValue[][];

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

function getOpponent(player: CellValue): CellValue {
  return player === "x" ? "o" : "x";
}

function evaluate(board: Board, aiPlayer: CellValue): number {
  const opponent = getOpponent(aiPlayer);

  const lines: any[] = [
    // Rows
    ...board,
    // Columns
    [0, 1, 2].map((i) => [board[0][i], board[1][i], board[2][i]]),
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line.every((cell: CellValue) => cell === aiPlayer)) return 10;
    if (line.every((cell: CellValue) => cell === opponent)) return -10;
  }

  return 0; // No winner yet
}

function isMovesLeft(board: Board): boolean {
  return board.some((row) => row.includes(""));
}

function minimax(
  board: Board,
  depth: number,
  isMax: boolean,
  aiPlayer: CellValue
): number {
  const score = evaluate(board, aiPlayer);
  if (score === 10 || score === -10) return score - depth;
  if (!isMovesLeft(board)) return 0;

  const opponent = getOpponent(aiPlayer);
  let best = isMax ? -Infinity : Infinity;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        board[i][j] = isMax ? aiPlayer : opponent;
        const value = minimax(board, depth + 1, !isMax, aiPlayer);
        board[i][j] = "";
        best = isMax ? Math.max(best, value) : Math.min(best, value);
      }
    }
  }

  return best;
}

export const hardPlayerVsComputer = async (
  board: Board,
  aiPlayer: CellValue
): Promise<Board> => {
  let bestVal = -Infinity;
  let bestMove: [number, number] = [-1, -1];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        board[i][j] = aiPlayer;
        const moveVal = minimax(board, 0, false, aiPlayer);
        board[i][j] = "";

        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMove = [i, j];
        }
      }
    }
  }

  const newBoard = cloneBoard(board);
  const [x, y] = bestMove;
  if (x !== -1 && y !== -1) {
    newBoard[x][y] = aiPlayer;
  }
  await delay(1000);
  return newBoard;
};

interface Move {
  row: number;
  col: number;
}

const _minimax = () => {
  let player: CellValue = "x";
  let opponent: CellValue = "o";

  const isMovesLeft = (board: Board): boolean => {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) if (board[i][j] === "") return true;
    return false;
  };

  const evaluate = (b: Board): number => {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
        if (b[row][0] === player) return +10;
        else if (b[row][0] === opponent) return -10;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
        if (b[0][col] === player) return +10;
        else if (b[0][col] === opponent) return -10;
      }
    }

    // Check diagonals
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      if (b[0][0] === player) return +10;
      else if (b[0][0] === opponent) return -10;
    }

    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      if (b[0][2] === player) return +10;
      else if (b[0][2] === opponent) return -10;
    }

    return 0;
  };

  const minimax = (board: Board, depth: number, isMax: boolean): number => {
    const score = evaluate(board);

    if (score === 10 || score === -10) return score;

    if (!isMovesLeft(board)) return 0;

    if (isMax) {
      let best = -Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = player;
            best = Math.max(best, minimax(board, depth + 1, false));
            board[i][j] = "";
          }
        }
      }

      return best;
    } else {
      let best = Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = opponent;
            best = Math.min(best, minimax(board, depth + 1, true));
            board[i][j] = "";
          }
        }
      }

      return best;
    }
  };

  const findBestMove = (board: Board): Move => {
    let bestVal = -Infinity;
    let bestMove: Move = { row: -1, col: -1 };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = player;
          const moveVal = minimax(board, 0, false);
          board[i][j] = "";

          if (moveVal > bestVal) {
            bestVal = moveVal;
            bestMove = { row: i, col: j };
          }
        }
      }
    }

    return bestMove;
  };

  return {
    findBestMove,
    setPlayer(p: CellValue) {
      player = p;
      opponent = p === "x" ? "o" : "x";
    },
  };
};

export const bestPlayerVsComputer = async (
  board: Board,
  player: CellValue
): Promise<Board> => {
  const minimaxAI = _minimax();
  minimaxAI.setPlayer(player); // Let AI play as "o"
  const bestMove = minimaxAI.findBestMove(board);

  console.log("Best move for AI:", bestMove);
  board[bestMove.row][bestMove.col] = player;
  await delay(1000);
  return board;
};
