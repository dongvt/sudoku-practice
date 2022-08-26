import { Fragment, useState } from "react";

import Square from "./Square";
import Keys from "./Keys";

import styles from "./Board.module.css";
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

  const setBoardNumber = (number) => {
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
