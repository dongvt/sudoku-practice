import { Fragment, useState } from "react";

import Square from "./Square";
import Keys from "./Keys";

import styles from "./Board.module.css";

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
}

const Board = (props) => {

  const [clickedId, setClickedId] = useState(0);
  const sudokuInitialState = [
    0,6,0,4,0,1,3,7,0,
    1,0,0,0,0,0,4,2,0,
    3,0,0,0,0,2,0,6,1,
    4,9,6,0,0,0,0,3,2,
    0,0,8,3,6,9,0,0,0,
    0,5,3,0,0,8,1,9,6,
    6,4,0,8,1,3,2,0,0,
    0,0,0,6,0,7,0,0,0,
    0,0,0,5,9,0,0,0,9,
  ]
  const [boardValues, setBoardValues] = useState(sudokuInitialState);

  //Function to test Sudoku

  const validateNumberOnBoard = (idx,currentNumber) => {
    const col = idx % 9;
    const row = ~~(idx / 9);
    //const box = ~~(~~(row/3) * 3 + col / 3); //Box index

    let set = new Set(); //To check repeating values

    //Check same column
    let colIdx = col;
    for(let i = 0; i < 9; i++) {
      set.add(boardValues[colIdx]);
      colIdx += 9;
      if(set.has(currentNumber)) return false;
    }

    //Check same row
    let rowIdx = row * 9;
    set.clear();
    for(let i = 0; i < 9; i++) {
      set.add(boardValues[rowIdx++]);
      if(set.has(currentNumber)) return false;
    }

    //Check box
    let iRow = getMinMultiple(row);
    let iCol = getMinMultiple(col); 
    set.clear();
    for(let i = iRow ; i < BOX + iRow; i++) {
      for(let j = iCol; j < BOX + iCol; j++) {
        //Compute the index by getting the current row and adding current column multiplied by the board size
        set.add(boardValues[i + BOARD * j]);
        //console.log(boardValues[i + BOARD * j],i + BOARD * j)
        if(set.has(currentNumber)) return false;
      }
    }

    return true;
    
  }

  const setBoardNumber = (number) => {
    console.log(validateNumberOnBoard(clickedId,number));
    setBoardValues((oldBoard) => {
        oldBoard[clickedId] = number;
        return [...oldBoard];
    });
  }

  const setClickedBox = (id) => {
    setClickedId(id);
  }

  return (
    <Fragment>
      <div className={styles.board}>
        {boardValues.map((sq, i) => {
          const col = i % 9;
          const row = ~~(i / 9);
          let oddSq = ~~(col / 3) % 2 === 1;
          if (~~(row / 3) % 2 === 0) oddSq = !oddSq;
          return (
            <Square key={i} id={i} odd={oddSq} setClicked={setClickedBox} txt={sq === 0 ? null : sq}/>
          );
        })}
      </div>
      <Keys setNumber={setBoardNumber} boxId ={clickedId}/>
    </Fragment>
  );
};

export default Board;
