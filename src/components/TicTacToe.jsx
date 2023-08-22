import { useLocalStorage } from '../hooks/useLocalStorage'
import Button from './Button'
import PlayBoard from './PlayBoard'
import { ScoreBoard } from './ScoreBoard'
import styles from './TicTacToe.module.css'
import { useEffect, useState } from 'react'

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

    const { data: board, updateData: updateBoard } = useLocalStorage('board', Array(9).fill(null))

    const { data: playerXTurn, updateData: updatePlayerXTurn } = useLocalStorage('playerXTurn', true)

    const { data: waitingForNewRound, updateData: updateWaitingForNewBoard } = useLocalStorage('waitingForNewRound', false)

    const { data: draw, updateData: updateDraw } = useLocalStorage('draw', false)

    const { data: scores, updateData: updateScores } = useLocalStorage('scores', { playerXScore: 0, playerOScore: 0 })

    const resetGame = () => {
        updatePlayerXTurn(true)
        updateBoard(Array(9).fill(null))
        updateScores({
            playerXScore: 0,
            playerOScore: 0
        })
        updateWaitingForNewBoard(false)
        updateDraw(false)
    }

    const resetBoard = () => {
        updateBoard(Array(9).fill(null))
        updateWaitingForNewBoard(false)
        updateDraw(false)
    }

    const updateScore = () => {
        if (waitingForNewRound) return
        if (playerXTurn) {
            updateScores({ ...scores, playerXScore: scores.playerXScore + 1 })
        } else {
            updateScores({ ...scores, playerOScore: scores.playerOScore + 1 })
        }
        updateWaitingForNewBoard(true)
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
        updateBoard(updatedBoard)
        updatePlayerXTurn(!playerXTurn)
        if (handleDraw(updatedBoard)) updateDraw(true)
    }

    const handleDraw = (board) => {
        const boardHasNullElement = board.every(element => element !== null)
        return boardHasNullElement
    }


    return (
        <div>
            <ScoreBoard scores={scores} currentPlayer={playerXTurn} waitingForNewRound={waitingForNewRound} draw={draw} />
            <PlayBoard board={board} handleClick={handleClick} />
            <div className={styles.buttonsWrapper}>
                <Button onClick={resetBoard} background={'#ad7b1b'}>Reset board</Button>
                <Button onClick={resetGame} background={'#8b0000'}>End game</Button>
            </div>
        </div>
    )
}

export default TicTacToe
