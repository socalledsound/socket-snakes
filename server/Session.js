import Game from './Game.js'



class Session{
    constructor(id){
        this.id = id
        this.clients = new Set
        this.game = new Game()
    }

    join(client, col){
       // console.log(client, col)
        if(client.session){
            throw new Error('client already in session')
        }
        this.clients.add(client);
        this.game.join(client.id, col)
        client.session = this;
       
    }
    leave(client){
        if(client.session !== this){
            throw new Error('client not in session');

        }
        this.clients.delete(client);
        client.session = null;
    }
}

//module.exports = Session;
export default Session