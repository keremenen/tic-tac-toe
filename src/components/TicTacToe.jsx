import PlayBoard from './PlayBoard'
import styles from './TicTacToe.module.css'
import { useState } from 'react'

export const TicTacToe = () => {

    // const [board, setBoard] = useState(Array(9).fill(null))
    const [board, setBoard] = useState(['X', 'X', 'X', 'O', 'O', 'O', 'X', 'X', 'X'])

    return (
        <div>
            <PlayBoard board={board} />
        </div>
    )
}

export default TicTacToe