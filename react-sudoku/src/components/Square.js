import styles from './Square.module.css';
const Square = (props) => {
    return <div className={`${styles.square} ${props.odd ? styles.odd : styles.even}`} />
}

export default Square;