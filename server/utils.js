import Client from './Client.js'
import Session from './Session.js'

function randomColor(){
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export function createId(len = 6, chars = 'abcdefghjklmnopqrstuwxyz0123456789'){
    let id = '';
    while(len--){
        id+=chars[Math.random() * chars.length | 0];
    }
    return id
  }


export function createClient(conn, id = createId(), col){
    return new Client(conn, id, col);
  }

export function getSession(id, sessions){
    return sessions.get(id);
  }
  
  
export function createSession(sessions, id = createId()){
    if(sessions.has(id)){
      throw new Error(`session ${id} already exists`);
    }
    const session = new Session(id)
    const masterSessionId = id
    //console.log('creating session', session)
    sessions.set(id, session)
    return [session, masterSessionId]
  }
  
  
export function broadcastSession(session, col){
    const clients = [...session.clients];
    //console.log('CLIENTS:  ', clients)
    if(clients && clients.length > 0){
     // console.log('truthy')
      clients.forEach( client => {
       // console.log(client, 'in clients')
        //console.log(client.emit)
        const players = Array.from(session.game.players)
          client.conn.emit('message', {
            type: 'session-broadcast',
            payload: {
                connectedId: client.id,
                playerCol: col,
                serverGame: session.game, 
                serverPlayers: players,
                clients: clients.map(client => {
                    return { 
                            id: client.id,     
                        }
                }),
            }
        })
        
  
    })
    }
  
  }
  export function broadcastState(session){
    //console.log(session)
    const clients = [...session.clients];
    if(clients && clients.length > 0){
     // console.log('truthy')
      clients.forEach( client => {
          client.conn.emit('message', {
            type: 'state-update',
            payload: session.game
        })
        
  
    })
    }
  }

  export function handleJoinGame(client, sessions, masterSessionId){
    const sessionExists = sessions.size > 0 ? true : false
    let joinedSession
    if(sessionExists){
      joinedSession = getSession(masterSessionId, sessions)
    }else{
      const [returnedSession, newMasterSessionId] = createSession(sessions)
      joinedSession = returnedSession
      masterSessionId = newMasterSessionId
    }
    joinedSession.join(client);
    broadcastSession(joinedSession)
    //broadcastState(joinedSession)
}