import styles from "./KeyNumber.module.css";
const KeyNumber = (props) => {
  return (
    <span
      className={`${styles["key-square"]} ${props.selected ? styles.selected : ''}`} 
      onClick={props.onClick.bind(this,props.number)}
    >
      {props.number}
    </span>
  );
};

export default KeyNumber;
