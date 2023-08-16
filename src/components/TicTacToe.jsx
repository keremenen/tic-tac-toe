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

    const resetBoard = () => {
        setBoard(Array(9).fill(null))
        setWaitingForNewRound(false)
    }

    const updateScore = () => {
        if (waitingForNewRound) return
        if (playerXTurn) {
            setScores(prevState => {
                console.log(prevState)
                return ({ ...prevState, playerXScore: prevState.playerXScore++ })
            })
        } else {
            setScores(prevState => {
                console.log(prevState)
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
                // setWaitingForNewRound(true)
            }
        })
    }

    const handleClick = (id) => {
        if (waitingForNewRound) return
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
            <ScoreBoard scores={scores} />
            <PlayBoard board={board} handleClick={handleClick} />
            <button onClick={resetBoard}>reset</button>
        </div>
    )
}

export default TicTacToe