import styles from './Box.module.css'

const Box = ({ value }) => {
    return (
        <button className={styles.box}>
            {value}
        </button>
    )
}

export default Box