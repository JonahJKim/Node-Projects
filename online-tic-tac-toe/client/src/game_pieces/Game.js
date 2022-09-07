import Board from './Board'
import React from 'react'
import './Game.css'

class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board/>
          </div>
        </div>
      );
    }
  }

export default Game