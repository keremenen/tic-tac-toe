import styles from './Box.module.css'

const Box = ({ value, handleClick }) => {
    return (
        <button className={styles.box} onClick={handleClick}>
            {value}
        </button>
    )
}

export default Box