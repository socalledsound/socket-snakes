class Food{
    constructor(){
        this.x = 0
        this.y = 0
        this.r = 0
        this.col = 0
        this.eaten = false
    }

    render(){
       // console.log(this.x, this.y, this.r, this.col)
       //console.log(this.r)
       if(!this.eaten){
        fill(this.col)
        noStroke()
        ellipse(this.x, this.y, this.r * 2)
       }

    }

    update({x, y, r, col, eaten}){
        this.x = x
        this.y = y
        this.r = r
        this.col = col
        this.eaten = eaten
    }

}