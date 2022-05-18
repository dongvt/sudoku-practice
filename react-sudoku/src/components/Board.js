import Square from "./Square";
import styles from './Board.module.css';
const Board = (props) => {
    const board = new Array(9*9).fill(null);
    return <div className={styles.board}>
        {board.map((sq,i) => {
            const idx = i % 9;
            const oddSq = ~~(idx / 3) % 2 === 1;
            return <Square key={i} odd={oddSq}/>
        })}
    </div>;
}

export default Board;