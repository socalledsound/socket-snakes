class TailSegment{
    constructor(pos, r){
        this.pos = pos
        this.r = r
    }

    serialize(){
        return (
            {
                x: this.pos.x,
                y: this.pos.y,
            }
        )
    }
}

export default TailSegment