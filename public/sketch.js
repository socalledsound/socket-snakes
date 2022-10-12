const socket = io()
let connectionManager, playerId
// const numFoods = 3000
let joinButton
let counter = 0
let started = false
let scroll

// window.onbeforeunload = closingCode;
// function closingCode(){
//    socket.emit('close')
//    return null;
// }

function randomColor(){
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

function setup(){
    createCanvas(600, 600)
    background(200)
    joinButton = makeJoinButton()
    joinButton.show()

}

function draw(){
    background(200)
   // translate(counter, 0)
    //console.log(connectionManager)
    if(started){
       // console.log('started')
        const gameState = connectionManager.gameState
        //console.log(gameState)
        if(gameState != null){
  
           connectionManager.game.update(gameState)
           
           const playerId = connectionManager.localPlayerId
           //console.log(playerId)
           let player, playerVec
           if(playerId){
            player =  gameState.players.filter(player => player.id === playerId)[0]
            playerVec = createVector(player.pos.x, player.pos.y)
        }
        scroll = playerVec.sub(300, 300)
        translate(-scroll.x, -scroll.y)
        connectionManager.game.render() 
           

        }

       
    }  
    //counter++ 
}

function mousePressed(){
    if(started){
        //const mouse = createVector(mouseX, mouseY)
        // const scrollPos = createVector(scroll.x + 300, scroll.y + 300)
        //mouse.add(scroll)
        //socket.emit('mouse-update', {mX: mouse.x, mY: mouse.y})
        //console.log(scroll.x)
        socket.emit('mouse-update', {mX: mouseX, mY: mouseY, scrollX: scroll.x, scrollY: scroll.y})
    }
    
}


function makeJoinButton(){
    const button = createButton('join')
    button.position(250, 300)
    button.style('padding', '2rem')
    button.style('border-radius', '0.9rem')
    button.style('font-size', '2rem')
    button.mousePressed(joinGame)
    return button
}

function joinGame(){
    connectionManager = new ConnectionManager(socket)
    socket.emit('join', randomColor())
    joinButton.hide()
    // loading screen here
  
}

function setStarted(){
    started = true
}