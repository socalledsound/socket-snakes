class ConnectionManager{
    constructor(socket){
        this.conn = socket
        this.game = null
        this.gameState = null
        this.localPlayerId = null
        this.peers = new Map 
        this.init()       
    }

    init(){
        this.conn.on('message', (msg) => {
            this.received(msg)
        })
    }

    received(msg){
        //console.log(msg)
         switch(msg.type){
            case 'session-broadcast' :
                console.log(msg)
                 this.updateManager(msg.payload);
                
                 return
            case 'state-update' : 
                 //this.updatePeer(data.clientId, data.fragment, data.state);
                 //console.log(msg.payload)
                this.gameState = msg.payload
                return
            case 'init-player' :
                 //this.initPlayer(msg)
                 return
            default:
                return
         }

     }

    //  send(data){
    //     //const msg = JSON.stringify(data);
    //     //console.log(`sending message: ${data.type}`);
    //         this.conn.emit('message', data);   
    // }

     updateManager({connectedId, playerCol, serverGame, serverPlayers, clients}){
        // // get id and numfoods from server
        // const me = connectedId
        //console.log(this.game)
        if(!this.localPlayerId){
            this.localPlayerId = connectedId
        }

        const numFoods = serverGame.numFoods
        if(!this.game){
            this.game = new Game(connectedId, numFoods)
            this.game.addPlayer(new Player(connectedId, playerCol))
        }
        

  
        
        const otherClients = clients.filter( client => connectedId !== client.id);
        otherClients.forEach(client => {
            if(!this.peers.has(client.id)){
                // const serverPlayers = Array.from(game.players)
                //console.log(serverPlayers, client.id)
                const serverPlayer = serverPlayers.filter(p => p.id === client.id)[0] 
               // console.log(serverPlayer.col)
                const player = new Player(client.id, serverPlayer.col)
                this.game.addPlayer(player)
                this.peers.set(client.id, player)
            }
        });

        [...this.peers.entries()].forEach(([id, player]) => {
            if(!clients.some(client => client.id === id)){
                this.game.removePlayer(player)
                this.peers.delete(id)
            }
        })
        
       
        setStarted()
     }
}


// socket.on('init', (msg) => {
//     console.log(msg.text)
// })

// socket.on('message', (msg) => {
//     switch(msg.type){
//         case 'session-broadcast' :
//             //console.log(msg)
//             return
//         case 'state-update' :
//             this.gameState = msg.game
//             return
//         default : 
//             return
//     }
// })
