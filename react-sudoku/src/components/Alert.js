import styles from './Alert.module.css';

const Alert = (props) => {
  return (
    <div className={`${styles.mybox} ${styles.success}`}>
        <p>
          Congrats! You solved the sudoku
        </p>
    </div>
  );
};

export default Alert;
