import styles from './ScoreBoard.module.css'

export const ScoreBoard = ({ scores: { playerXScore, playerOScore }, currentPlayer, waitingForNewRound, draw }) => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.scoreTabsWrapper}>
                <div className={`${styles.scoreTab} ${currentPlayer ? styles.xTurn : ''}`}>
                    Player X: <span>{playerXScore}</span>
                </div>
                <div className={`${styles.scoreTab} ${!currentPlayer ? styles.oTurn : ''} `}>
                    Player O: <span>{playerOScore}</span>
                </div>
            </div>
            <div className={styles.infoMessage}>
                {draw && <p>Draw<br /><span>Click "Reset Board" to continue.</span></p>}
                {waitingForNewRound && <p>Player {!currentPlayer ? 'X' : 'O'} scored a point. <br /><span>Please reset the round to countinue.</span></p>}
            </div>
        </div>
    )
}

export default ScoreBoard