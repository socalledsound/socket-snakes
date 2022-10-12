// import Vector2 from 'vector2'
// import {Vector, VectorConstants } from 'simplevectorsjs'
import { calc, vector, victor, point, ipoint } from "@js-basics/vector";
import TailSegment from './TailSegment.js'


class Player {
    constructor(id, col){
        this.id = id
        this.col = col
        this.pos = vector(300, 300)
        this.r = 20
        this.vel = vector(0,0)
        this.maxForce = 3.0
        this.maxVel = 2.0
        this.friction = 0.99
        this.tail = Array.from({length: 6}, (e, i) => {
            const loc = vector(
              this.pos.x - this.r * (i + 1), 
              this.pos.y 
                )
            return new TailSegment(loc, this.r)
          })
        this.dead = false
        this.alreadyDead = false
        
    }

    // checkEdges(){
    //     if(this.pos.x - this.r < 0){
    //         this.pos.x = 600 - this.r
    //     }
    //     if(this.pos.x > 600 - this.r){
    //         this.pos.x = this.r 
    //     }
    //     if(this.pos.y - this.r < this.r){
    //         this.pos.y = 600 - this.r
    //     }
    //     if(this.pos.y + this.r > 600){
    //         this.pos.y = this.r 
    //     }
    // }

    checkWalls(session){
        if(this.pos.x < -session.game.mapSize/2 + 50 + session.game.wallWidth * 1.5 || 
        this.pos.x > session.game.mapSize/2 - 50 - session.game.wallWidth * 1.5 || 
        this.pos.y < -session.game.mapSize/2 + 50 + session.game.wallWidth * 1.5 || 
        this.pos.y > session.game.mapSize/2 - 50 - session.game.wallWidth * 1.5){
          this.dead = true
       //setTimeout(game.end, 100)
     }
    }

    grow(num){
        const newArr = Array.from({length: num}, () => {
            const initPos = vector(-10000, -10000)
           return new TailSegment(initPos,this.r/1.5)
         })
        
         this.tail = [...this.tail].concat(newArr)
    }

    moveToMouse({mX, mY, scrollX, scrollY}){
        console.log(mX, mY, scrollX, scrollY)
        let mouse = vector(mX, mY)
        let scroll = vector(scrollX, scrollY)
        let mousePos = vector(() => mouse + scroll)
        const dir = vector(() => mousePos - this.pos)
      //  console.log(dir)
       const maxAcc = vector(() => (dir/dir.length) * this.maxForce)

       // this.acc.setMag(this.maxForce)
        const newVel = vector(() => maxAcc + this.vel)
        this.vel = newVel
        // const smaller = vector(0.2, 0.2)
        // const smallerVel = vector(() => newVel * smaller) 
        // this.acc = vector(0,0)
        // const newPos = vector(() => this.pos + smallerVel)
        // this.pos = newPos
        // const newPos = vector(() => this.pos + newVel)
        // this.pos = newPos
        
    }

    update(){
        //console.log('updating')
        if(!this.dead){
            this.vel = vector(() => this.vel * this.friction)
            const oldPos = this.pos
            const newPos = vector(() => this.pos + this.vel)
            const d1 = newPos.dist(oldPos)
            if(d1 > 1){
                const closest = this.tail.length - 1
                const d2 = this.tail[closest].pos.dist(oldPos)
                if(d2 > this.r/4){
                    this.tail[closest].pos = oldPos
                    for(let i = 0; i < this.tail.length -1; i++){
                        this.tail[i].pos = this.tail[i+1].pos
                    }
                }
            } 
            this.pos = newPos
        }else{
            if(!this.alreadyDead){
                // send game over message
                console.log('snake died')
                this.alreadyDead = true
            }
           
        }

    }

    serialize(){
        return {
            id: this.id,
            col: this.col,
            pos: {x: this.pos.x, y: this.pos.y},
            tail: this.tail.map(seg => seg.serialize()),
        }
    }

    log(){
        console.log(this.pos.x)
    }


}

export default Player