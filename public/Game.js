class Game{
    constructor(id, numFoods){
        this.localPlayerId = id
        this.players = new Set
        this.foods = Array.from({ length: numFoods}, () => new Food()),
        // this.foodSize = 12
        this.bgCol = 43
        this.wallCol = [240, 20, 20, 200]
        this.wallWidth = 20
        this.over = false
        this.mapSize = 3600
    }

    addPlayer(player){
        this.players.add(player)
    }

    removePlayer(player){
        this.players.delete(player)
    }

    render(){
        fill(this.bgCol)
        stroke(this.wallCol)
        strokeWeight(this.wallWidth)
        rect(-this.mapSize/2 + 50, -this.mapSize/2 + 50, this.mapSize - 100, this.mapSize - 100)
        const localPlayers = Array.from(this.players)
        localPlayers.forEach(player => {
            //console.log(player.id)
            player.render()
        })
        this.foods.forEach(food => {
            if(!food.eaten){
                food.render()
            }else{
                //console.log('eaten')
            }
            
        })
    }

    update({players, foods}){
       // console.log(players)
        // console.log(players)
        if(players && players.length > 0){
            players.forEach(player => {
                const localPlayers = Array.from(this.players)
              // console.log(localPlayers, players)
                const playerToUpdate = localPlayers.filter(p => p.id === player.id)[0]
                //console.log(playerToUpdate, player)
                playerToUpdate.update(player)
            })
            // const playerUpdate = players.filter(p => p.id === this.localPlayerId)[0]
            
            
            
        }
        this.foods.forEach((food, idx) => {
            food.update(foods[idx])
        })
       

    }
}