import Box from "./Box"
import styles from './PlayBoard.module.css'

const PlayBoard = ({ board }) => {
    return (
        <div className={styles['buttons-wrapper']}>
            {
                board.map((item, i) => (
                    <Box key={i} value={item} />
                ))
            }
        </div >
    )
}

export default PlayBoard