

class Player {
    constructor(id, col){
        this.id = id
        this.local = false
        this.pos = createVector(300,300)
        this.r = 20
        // this.col = [random(100, 255), random(100, 255), random(100, 255),]
        this.col = col
        this.tail = []
    }

    render(){
       // console.log(this.pos)
        fill(this.col)
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.r * 2)
             // draw the tail
        if(this.tail.length > 0){
            this.tail.forEach(segment => {
                segment.render()
                })
        }

    }

    update({pos, col, tail}){
        this.col = col
        this.pos.x = pos.x
        this.pos.y = pos.y
        const tailVectors = tail.map((seg) => createVector(seg.x, seg.y))
        this.tail = tailVectors.map(vec => new TailSegment(vec, this.r/1.2, this.col))
    }

}