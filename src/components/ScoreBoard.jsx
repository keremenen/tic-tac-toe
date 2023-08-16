import styles from './ScoreBoard.module.css'

export const ScoreBoard = ({ scores: { playerXScore, playerOScore }, currentPlayer }) => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.scoreTab} ${currentPlayer && styles.xTurn}`}>Player X: <span>{playerXScore}</span></div>
            <div className={`${styles.scoreTab} ${!currentPlayer && styles.oTurn} `}>Player O: <span>{playerOScore}</span></div>
        </div>
    )
}

export default ScoreBoard