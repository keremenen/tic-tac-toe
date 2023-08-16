import React from 'react'

export const ScoreBoard = ({ scores: { playerXScore, playerOScore } }) => {
    return (
        <div>
            <div>Player X: {playerXScore}</div>
            <div>Player O: {playerOScore}</div>
        </div>
    )
}

export default ScoreBoard