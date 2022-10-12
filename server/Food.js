import { calc, vector, victor, point, ipoint } from "@js-basics/vector";

class Food{
    constructor(x, y, r, col){
        this.x = x
        this.y = y
        this.col = col
        this.r = r
    }

    checkCollision(player){
        // if this nugget hasn't been eaten
        if(!this.eaten){
            // const playerPos = vector(pX, pY)
            const foodPos = vector(this.x, this.y)

          // get the distance between it and the player
          const d = player.pos.dist(foodPos)
          //console.log(d)
          // if that distance is less than the combined radii
            if(d < (player.r + this.r)){
                // do some stuff
                this.eaten = true
                const num = this.type === 1 ? 3 : 6
                player.grow(num)
                //game.score++
            }
        }
    }



}

export default Food