import Square from "./Square";
import styles from './Board.module.css';
const Board = (props) => {
    const board = new Array(9*9).fill(null);
    return <div className={styles.board}>
        {board.map((sq,i) => {
            const col = i % 9;
            const row = ~~(i / 9);
            let oddSq = ~~(col / 3) % 2 === 1;
            if(~~(row / 3) % 2 === 0) oddSq = !oddSq;
            return <Square key={i} odd={oddSq}/>
        })}
    </div>;
}

export default Board;