import Button from './Button'
import PlayBoard from './PlayBoard'
import { ScoreBoard } from './ScoreBoard'
import styles from './TicTacToe.module.css'
import { useState } from 'react'

const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

export const TicTacToe = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [playerXTurn, setPlayerXTurn] = useState(true)
    const [waitingForNewRound, setWaitingForNewRound] = useState(false)
    const [scores, setScores] = useState({
        playerXScore: 0,
        playerOScore: 0
    })

    const resetGame = () => {
        setPlayerXTurn(true)
        setBoard(Array(9).fill(null))
        setScores({
            playerXScore: 0,
            playerOScore: 0
        })
        setWaitingForNewRound(false)
    }

    const resetBoard = () => {
        setBoard(Array(9).fill(null))
        setWaitingForNewRound(false)
    }

    const updateScore = () => {
        if (waitingForNewRound) return
        if (playerXTurn) {
            setScores(prevState => {
                return ({ ...prevState, playerXScore: prevState.playerXScore++ })
            })
        } else {
            setScores(prevState => {
                return ({ ...prevState, playerOscore: prevState.playerOScore++ })
            })
        }
        setWaitingForNewRound(true)
    }

    const checkIfWin = (board) => {
        WINNING_CONDITIONS.forEach((item, i) => {
            const [x, y, z] = item
            if (board[x] && board[x] === board[y] && board[y] === board[z]) {
                updateScore()
            }
        })
    }

    const handleClick = (id) => {
        if (waitingForNewRound) return
        if (board[id]) return
        const updatedBoard = board.map((item, i) => {
            if (i === id && !item) return playerXTurn ? 'X' : 'O'
            return item
        })
        checkIfWin(updatedBoard)
        setBoard(updatedBoard)
        setPlayerXTurn(prevState => !prevState)
    }

    return (
        <div>
            <ScoreBoard scores={scores} currentPlayer={playerXTurn} waitingForNewRound={waitingForNewRound} />
            <PlayBoard board={board} handleClick={handleClick} />
            <div className={styles.buttonsWrapper}>
                <Button onClick={resetBoard} background={'#ad7b1b'}>Reset board</Button>
                <Button onClick={resetGame} background={'#8b0000'}>End game</Button>
            </div>
        </div>
    )
}

export default TicTacToe