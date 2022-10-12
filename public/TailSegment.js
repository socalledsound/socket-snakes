class TailSegment {
    constructor(pos, r, col){
      this.alpha = 255
      this.col = col
      this.pos = pos
      this.r = r
    }
    
    render(){
      fill([...this.col, this.alpha])
      stroke(140)
      strokeWeight(1)
      ellipse(this.pos.x, this.pos.y, this.r * 2)
    }
  
  }