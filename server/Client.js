class Client{
    constructor(conn, id){
        this.conn = conn
        this.id = id
        this.session = null
    }

    // msg: {type, payload }
    broadcast(msg){
        if(!this.session){
            throw new Error('cannot broadcast without joing session')
        }
        // msg.clientId = this.id
       // console.log(this.session.clients)
        this.session.clients.forEach(client => {
            // if(this == client){
            //     return
            // }
            client.send(msg)
            //console.log('broadcasting', data)
        })
    }

    // msg: {type, payload}
    send(msg){
        //console.log(msg)
        this.conn.emit('message', msg, (err) => {
            if(err){
                console.log('message failed', data, err)
            }
        })
    }
}

//module.exports = Client;
export default Client