import React, { useState, useEffect } from 'react'
import Square from './Square';
import calculateWinner from './CalculateWinner'
import { io } from 'socket.io-client'
import './Game.css'

const socket = io.connect('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        count: 0
        };
    }

    componentDidMount() {
        socket.on('changedState', (gameState) => {
            this.setState({
                squares: gameState.squares,
                xIsNext: gameState.xIsNext,
                count: gameState.count
            })

        })
    }
    
    handleClick(i) {
        console.log('yo')
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        socket.emit('updateState', {
            squares: squares,
            xIsNext: !this.state.xIsNext,
            count: this.state.count + 1
        })
    }
  
    renderSquare(i) {
        return (
            <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
            />
        );
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        let empty;
        if (winner) {
            status = 'Winner: ' + winner;
            empty = true
        } else if (this.state.count === 9) {
            empty = true
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (empty === true) {
            setTimeout(() => {
                socket.emit('updateState', {
                    squares: Array(9).fill(null),
                    xIsNext: true,
                    count: 0
                })
            }, 2000)
        } 
        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            </div>
        );
        }
        
  }


export default Board