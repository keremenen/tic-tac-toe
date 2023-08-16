import PlayBoard from './PlayBoard'
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

    const resetBoard = () => {
        setBoard(Array(9).fill(null))
    }

    const checkIfWin = (board) => {
        WINNING_CONDITIONS.forEach((item, i) => {
            const [x, y, z] = item
            if (board[x] && board[x] === board[y] && board[y] === board[z]) {
                if (playerXTurn) {
                    return console.log(`Player X won`)
                }
                console.log(`Player O won`)
            }
        })
    }

    const handleClick = (id) => {
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
            <PlayBoard board={board} handleClick={handleClick} />
            <button onClick={resetBoard}>reset</button>
        </div>
    )
}

export default TicTacToe