import Player from './Player.js'
import Food from './Food.js'
import {  broadcastSession } from './utils.js'
class Game{
    constructor(){
       // this.localPlayerId = null
        this.players = new Set
        this.friction = 0.99
        this.numFoods = 1000
        this.foodSize = 12
        this.mapSize = 3600
        this.canvasSize = 600
        this.foods = Array.from({ length: this.numFoods}, (el, idx) => {
            const xCoin = Math.random() > 0.5 ? 1 : -1
            const yCoin = Math.random() > 0.5 ? 1 : -1
            const x = Math.random() * this.mapSize/2 * xCoin
            const y = Math.random() * this.mapSize/2 * yCoin
            // const x = Math.random() * 600
            // const y = Math.random() * 600
            const r = 5
            const col = '#00FF00'
            return new Food(x, y, r, col)
        })
        this.wallWidth = 20
        // this.bgCol = 43
        // this.wallCol = [240, 20, 20, 200]
        // this.drawWhoops = false
        // this.numAliens = 15
    }

    addPlayer(player){
        this.players.add(player)
    }

    removePlayer(player){
        this.players.delete(player)
    }

    // init(){

    // }

    join = (id, col) => {
        console.log(col, 'in server game')
        this.players.add(new Player(id, col))
        
       // this.localPlayerId = id
    }
}

export default Game