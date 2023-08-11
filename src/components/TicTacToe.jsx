import PlayBoard from './PlayBoard'
import styles from './TicTacToe.module.css'
import { useState } from 'react'

export const TicTacToe = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    // const [board, setBoard] = useState(['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'])

    const handleClick = (id) => {
        const updatedBoard = board.map((item, i) => {
            if (i === id) return 'X'
            return item
        })
        setBoard(updatedBoard)
        console.log(id)
    }

    return (
        <div>
            <PlayBoard board={board} handleClick={handleClick} />
        </div>
    )
}

export default TicTacToe