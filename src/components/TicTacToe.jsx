import PlayBoard from './PlayBoard'
import styles from './TicTacToe.module.css'
import { useState } from 'react'

export const TicTacToe = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [playerXTurn, setPlayerXTurn] = useState(true)

    const handleClick = (id) => {
        const updatedBoard = board.map((item, i) => {
            if (i === id && !item) return playerXTurn ? 'X' : 'O'

            return item
        })
        setBoard(updatedBoard)
        setPlayerXTurn(prevState => !prevState)
    }

    return (
        <div>
            <PlayBoard board={board} handleClick={handleClick} />
        </div>
    )
}

export default TicTacToe