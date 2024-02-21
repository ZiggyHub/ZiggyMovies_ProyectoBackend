const { response, request } =require("express");
const Service = require('../models/services.model');

const serviceGet = async( req = request, res = response) =>{
    try {
        const queryParam = {active:true};
        const service = await Service.find(queryParam);
        res.status(200).json({
            message:'Aqui tan tus servicios papa',
            service
        })
    } catch {
        res.status(500).json({
            message:'te la pelastei papa'
        })
    }

}

const servicePost = async( req, res) => {
try {
    const { name, active, price } = req.body
    const data ={ name, active, price }

    const service = new Service(data)
    await service.save()

    res.status(200).json({
        message: 'Servicio cargado con exito',
        service
    })

}catch (error) {
    rex.status(500).json({
        message: 'Error en el servidor',
        error
    })
}

}

module.exports = {
    serviceGet,
    servicePost
}