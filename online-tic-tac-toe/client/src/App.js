// import { io } from 'socket.io-client'
import React, { useEffect } from 'react'
import Game from './game_pieces/Game';
import './App.css'

// const socket = io.connect('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });
// const socket = io('ws://localhost:3000')

function App() {
  return (
    <div className="background">
      <Game />
    </div>
  );
}

export default App;



