import styles from './Box.module.css'

const playersStyles = {
    X: styles.red,
    O: styles.green,
}

const Box = ({ value, handleClick }) => {
    return (
        <button className={`${styles.box} ${(value ? playersStyles[value] : '')}`} onClick={handleClick}>
            {value}
        </button>
    )
}

export default Box