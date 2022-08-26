import styles from "./Square.module.css";
const Square = (props) => {
  return (
    <div
      className={`${styles.square} ${props.odd ? styles.odd : styles.even}`}
      onClick={props.setClicked.bind(this, props.id)}
    >
      {props.txt}
    </div>
  );
};

export default Square;
