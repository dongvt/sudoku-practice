const BOARD_SIZE = 81;

const isValidBoard = (board) => {

  const rowSet = new Array(9).fill().map(row => new Set());
  const colSet = new Array(9).fill().map(row => new Set());
  const boxSet = new Array(9).fill().map(row => new Set());
  for (let i = 0; i < board.length; i++) {
    const val = board[i].val;
    const row = ~~(i / 9);
    const col = i % 9;
    const box = ~~(~~(row / 3) * 3 + col / 3);
    if (!colSet[col].has(val)) colSet[col].add(board[i].val); else return false;
    if (!rowSet[row].has(val)) rowSet[row].add(board[i].val); else return false;
    if (!boxSet[box].has(val)) boxSet[box].add(board[i].val); else return false;
  }

  return true;
}
/**
 * Checks the if a given number entered in an specific index is a valid number into the Sudoku board
 * @param {number} num Number to be added
 * @param {number} idx Where is the number located in the board
 * @param {number[]} board Current board
 * @returns {boolean}
 */
const checkValidNumberInCell = (num, idx, board) => {
  const col = idx % 9;
  const row = ~~(idx / 9);
  const box = ~~(~~(row / 3) * 3 + col / 3);

  const rowSet = new Set();
  const colSet = new Set();
  const boxSet = new Set();
  for (let i = 0; i < board.length; i++) {
    const currRow = ~~(i / 9);
    const currCol = i % 9;
    if (currCol === col) colSet.add(board[i].val);
    if (currRow === row) rowSet.add(board[i].val);
    if (~~(~~(currRow / 3) * 3 + currCol / 3) === box) boxSet.add(board[i].val);
  }

  return !rowSet.has(num) && !colSet.has(num) && !boxSet.has(num);
};

/**
 * Fill the diagonal with 1-9 shuffled randomly
 * @param {number[]} board
 */
const fillDiagonal = (board) => {
  //Create simple ordered array
  const numbers = new Array(9).fill().map((val, idx) => idx + 1);

  //Shuffle: simple select a random index from 0 to 8 and change with the one at the right
  for (let i = 0; i < 10; i++) {
    const ranIdx = ~~(Math.random() * 8);
    [numbers[ranIdx], numbers[ranIdx + 1]] = [
      numbers[ranIdx + 1],
      numbers[ranIdx],
    ];
  }
  //Add to the board
  let boardIdx = 0,
    numberIdx = 0;
  while (numberIdx < 9) {
    board[boardIdx].val = numbers[numberIdx++];
    board[boardIdx].modifiable = false;
    boardIdx += 10;
  }
};

/**
 * Use backtracking to "solve" the sudoku with an already placed random diagonal
 * @param {*} idx The current board index
 * @param {*} board The whole board
 * @returns {boolean} backtracking helper
 */
const fillBoard = (idx, board) => {
  while (idx < BOARD_SIZE && !board[idx].modifiable) {
    idx++;
  }
  if (idx >= BOARD_SIZE) return true;

  for (let x = 1; x <= 9; x++) {
    if (checkValidNumberInCell(x, idx, board)) {
      let ret = null;
      board[idx].val = x;
      board[idx].modifiable = false;

      ret = fillBoard(idx + 1, board);

      if (ret) return true; //We are done, stop all the backtracking
      board[idx].val = -1;
      board[idx].modifiable = true;
    }
  }

  return false;
};

/**
 * Created the board with a complete valid sudoku board
 * @returns {number[]}
 */
const createFullValidSudoku = () => {
  /***
   * Cell Object:
   * val: numeric value of the cell (-1 means empty)
   * modifiable: in an non-complete sudoku, this is true when the cell can be modifiable
   */

  const board = new Array(BOARD_SIZE).fill().map((cell) => {
    return { val: -1, modifiable: true };
  });

  fillDiagonal(board);
  fillBoard(0, board);

  return board;
};

/**
 * Creates the entire array with an unique answer (questionable xD)
 * @returns {number[]} board
 */
const createUniqueSudoku = () => {
  const boardComparator = (fullBoard,newBoard) => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (newBoard[i].val !== fullBoard[i].val) return false;
    }
    return true;
  };
  const simulateSolution = (newBoard) => {
    const board = newBoard.map(obj => {return {...obj}});
    fillBoard(0,board);
    return board;
  }

  const fullBoard = createFullValidSudoku();
  const newBoard = fullBoard.map(obj => {return {...obj}});

  while (true) {
    const ranIdx = ~~(Math.random() * BOARD_SIZE);
    const oldObj = newBoard[ranIdx];
    newBoard[ranIdx] = { val: -1, modifiable: true };
    if(!boardComparator(fullBoard, simulateSolution(newBoard))) {
      newBoard[ranIdx] = oldObj;
      break;
    } 
  } 

  return newBoard;

};

export { createUniqueSudoku,isValidBoard };
