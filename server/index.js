// import libraries
// import http from 'http'
import path from 'path'
import express from 'express'
import { Server } from 'socket.io'
// import my code
// const Session = require('./Session');
// const Client = require('./Client');
// import Client from './Client.js'
// import Session from './Session.js'
import { createClient, getSession, createSession, broadcastSession, broadcastState } from './utils.js'
const FRAME_RATE = 30
const __dirname = path.resolve();
const publicPath = path.join(__dirname, 'public')
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.static(publicPath));
let server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
let masterSessionId = null
// const io = require('socket.io')( server, {
//     cors: {
//        origin: "*",
//     }
// });
const io = new Server(server)

const sessions = new Map;



io.on('connection', (connection) => {
    console.log('new connection')
    const client = createClient(connection)

    connection.on('join', (col) => {
      const sessionExists = sessions.size > 0 ? true : false
      let joinedSession
      if(sessionExists){
        joinedSession = getSession(masterSessionId, sessions)
      }else{
        const [returnedSession, newMasterSessionId] = createSession(sessions)
        joinedSession = returnedSession
        masterSessionId = newMasterSessionId
        startGameInterval(client, sessions, masterSessionId)
      }
      joinedSession.join(client, col);
       broadcastSession(joinedSession, col)
      //broadcastState(joinedSession)
      
    })

    connection.on('mouse-update', (data) => {
      //console.log(data)
      const session = client.session
      if(session){
        if(session.game){
          //console.log(session.game.players)
          if(session.game.players && session.game.players.size > 0){
            const playersArr = Array.from(session.game.players)
           // console.log(playersArr[0].id, client.id)
            const player = playersArr.filter(player => player.id === client.id)[0]  
            player.moveToMouse(data)
          }
         
        }
        
      }
    })

    // just mouse update now?
    // 'state-update' : 
    // const [prop, value] = data.state;
    // const newState = {}
    // newState[data.fragment] = {} 
    // newState[data.fragment][prop] = value
    // client.state = {...client.state, ...newState};
    // client.broadcast(data);


    connection.on('disconnect', () => {
      console.log('client has left session')
      const session = client.session;
      if(session){
        session.leave(client);
        if(session.clients.size === 0){
            sessions.delete(session.id);
        }
      }
      broadcastSession(session);
    })
})

function startGameInterval(client, sessions, masterSessionId){
  const intervalId = setInterval(() => updateGame(client, sessions, masterSessionId), 1000/FRAME_RATE)
}

function updateGame(client, sessions, masterSessionId){
  
    //console.log(client, sessions, masterSessionId)
    const session = getSession(masterSessionId, sessions)
    if(session){
      if(!session.game.over){
        // msg: {type, payload}
        // const msg = {type: 'state-update', payload: session.game}
        //console.log('sending: ', session.game)
        const playerArr = Array.from(session.game.players)
        playerArr.forEach(player => {
          player.update()
          player.checkWalls(session)
          session.game.foods.forEach(food => {  
            food.checkCollision(player)
          })

        })
        const serializedPlayers = playerArr.map(player => player.serialize())
        const gameUpdate = {players: serializedPlayers, foods: session.game.foods}
        console.log(gameUpdate)
        client.broadcast({type: 'state-update', payload: gameUpdate})
      }else{
        // const msg = {type: 'game-over'}
        client.broadcast({type: 'game-over'})
      }
    }

    
  
}