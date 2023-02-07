import { useState } from "react";

import Square from "./Square";
import Keys from "./Keys";

import styles from "./Board.module.css";

import { createUniqueSudoku } from "../Helpers/SudokuAlgo";
const BOX = 3;
const BOARD = 9;

/**
 * Given a number n return the multiple of three that is closest to n
 * @param {int} number
 * @return {int} minMultiple
 */
const getMinMultiple = (number) => {
  number = number + ~~(number / BOX);
  number = number - (number % BOX);
  return number;
};

const Board = (props) => {
  const [clickedId, setClickedId] = useState(-1);
  const [valid,setValid] = useState(true);
  const [boardValues, setBoardValues] = useState(new Array(81).fill(-1));

  //Function to test Sudoku
  const validateNumberOnBoard = (idx, currentNumber) => {
    const col = idx % 9;
    const row = ~~(idx / 9);
    //const box = ~~(~~(row/3) * 3 + col / 3); //Box index

    let set = new Set(); //To check repeating values

    //Check same column
    let colIdx = col;
    for (let i = 0; i < BOARD; i++) {
      set.add(boardValues[colIdx].val);
      colIdx += BOARD;
      if (set.has(currentNumber)) return false;
    }

    //Check same row
    let rowIdx = row * 9;
    set.clear();
    for (let i = 0; i < BOARD; i++) {
      set.add(boardValues[rowIdx++].val);
      if (set.has(currentNumber)) return false;
    }

    //Check box
    let iRow = getMinMultiple(row);
    let iCol = getMinMultiple(col);
    set.clear();
    console.log(iRow,iCol)
    for (let i = iRow; i < BOX + iRow; i++) {
      for (let j = iCol; j < BOX + iCol; j++) {
        //Compute the index by getting the current row and adding current column multiplied by the board size
        //console.log(i,BOARD,j,i + BOARD * j);
        set.add(boardValues[(i + BOARD) * j].val);
        if (set.has(currentNumber)) return false;
      }
    }

    return true;
  };

  const setBoardNumber = (number) => {
    
    if(clickedId === -1 || !boardValues[clickedId].modifiable) return;

    setValid(validateNumberOnBoard(clickedId,number));

    // Here is just to change the board state
    setBoardValues((oldBoard) => {
      oldBoard[clickedId] = { val: number, modifiable: true };
      return [...oldBoard];
    });
  };

  const setClickedBox = (id) => {
    if(!valid) return;
    setClickedId(id);
    
  };

  const newSudokuHandle = () => {
    setBoardValues(createUniqueSudoku());
  }

  return (
    <>
      <button onClick={newSudokuHandle}>Create new board</button>
      <div className={styles.board}>
        {boardValues.map((sq, i) => {
          const col = i % BOARD;
          const row = ~~(i / BOARD);
          let oddSq = ~~(col / BOX) % 2 === 1;
          if (~~(row / BOX) % 2 === 0) oddSq = !oddSq;
          return (
            <Square
              key={i}
              id={i}
              odd={oddSq}
              setClicked={setClickedBox}
              txt={sq.val === -1 ? null : sq.val}
              selected={clickedId===i}
              invalid={!valid && clickedId === i}
            />
          );
        })}
      </div>
      <Keys setNumber={setBoardNumber} boxId={clickedId} selected={clickedId === -1 ? 0 : boardValues[clickedId].val}/>
    </>
  );
};

export default Board;
