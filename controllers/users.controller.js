const { response, request } = require('express');
const User = require('../models/users.model');
const asyncHandler = require('express-async-handler')
const { schema } =require('../validators/users.validators')

const userGet = asyncHandler(async( req = request, res = response) => {
    try {
        const queryParam = { state:true };
        const usuario = await User.find(queryParam).populate("service");
        res.status(200).json({
            usuario
        })
    } catch {
        res.status(500).json({
            message: 'Error al buscar los usuarios'
        })
    }
    res.status(200).json({message:'Usuarios route'})
})

const userPost = asyncHandler(async( req, res) => {
    try {
        const { userName, email, password, state, service } = req.body
        const data ={userName, email, password, state, service }

        const { error } = schema.validate(data)

        if(error){
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const user = new User(data)
        await user.save()

        res.status(200).json({
            message:'ERES UN CHINGON',
            user
        })

    } catch (error) {
        res.status(500).json({
            message: 'NO TE RINDAS',
            error
        })
    }
})

const userPut = asyncHandler(async(req, res) => {
    try {
        const { id } = req.params;
        const { userName, email, password, state, service } = req.body
        const data = { userName, email, password, state, service } 

        const user = await User.findByIdAndUpdate(id, data)
        res.status(200).json({
            message:'Usuario modificado con exito',
            ok:true
        })
    } catch (error) {
        res.status(500).json({
            message: 'Algo salio mal'
        })
    }
})

const userDel = asyncHandler(async(req, res) => {

    try {
        const { id } = req.params
        const falseState = {active:false}

        const user = await User.findByIdAndUpdate(id, falseState)
        res.status(200).json({
            message:`El usuario con el id ${id} fue eliminado`,
            user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Algo salio mal'
        })
    }

}) 


module.exports = { 
    userGet,
    userPost,
    userPut,
    userDel
}
