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

const servicePut = async( req, res ) => {
    try {
        const { id } = req.params;
        const { name, active, price } = req.body
        const data = { name, active, price };

        await Service.findByIdAndUpdate(id, data)

        res.status(200).json({
            message:'Servicio actualizado con exito',
            ok:true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Algo salio mal'
        })
    }
}
 
const serviceDel = async (req, res) =>{
    try {
        const { id } = req.params
        const falseActive = {active: false}
        await Service.findByIdAndUpdate(id, falseActive )
  
        res.status(200).json({
          message: `El servicio ${id} fue eliminado`
        })
  
    } catch (error) {
        res.status(200).json({
            message: `Algo salio mal al intentar eliminar el servicio ${id}`,
                service
            })
    }
}
module.exports = {
    serviceGet,
    servicePost,
    servicePut,
    serviceDel
}