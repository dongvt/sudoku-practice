import KeyNumber from "./KeyNumber";
import styles from "./Keys.module.css";

const Keys = (props) => {
  return (
    <div className={styles.main}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <KeyNumber key={n} number={n} onClick={props.setNumber} boxId={props.boxId} selected={props.selected === n}/>
      ))}
    </div>
  );
};

export default Keys;
