const express = require('express');
const { errors } = require('celebrate');
const { dataBaseConnection } = require('../db/database');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3005
        this.usersPath = "/db/users"
      //  this.servicePath = "/db/services"
        this.dataBaseConnection()
        this.middlewares()
        this.routes()
    }

    async dataBaseConnection(){
        await dataBaseConnection()
    }


    middlewares(){
        this.app.use(express.json())
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/users.routes'), errors());
       // this.app.use(this.servicePath, require('../routes/services.routes'));

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`escuchando en el puerto ${this.port}`)
        })
    }
}


module.exports = Server; 