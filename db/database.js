const mongoose = require("mongoose")

const dataBaseConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CONN_DEV,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Ahuevo papirri')

    }catch(error){
        console.log(error);
        throw new Error ("Te la pelastei papa")
    }
}

module.exports = {
    dataBaseConnection
}
