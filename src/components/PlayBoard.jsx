import Box from "./Box"
import styles from './PlayBoard.module.css'

const PlayBoard = ({ board, handleClick }) => {
    return (
        <div className={styles['buttons-wrapper']}>
            {
                board.map((item, i) => (
                    <Box key={i} value={item} handleClick={() => handleClick(i)} />
                ))
            }
        </div >
    )
}

export default PlayBoard