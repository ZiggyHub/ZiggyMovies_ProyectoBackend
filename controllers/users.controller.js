const { response, request } = require('express');
const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const { schema } =require('../validators/users.validators');

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

        //Hash al password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creamos el usuario
        const user = await User.create({
         userName,
         email,
         password: hashedPassword,
         state,
         service
        })
    
        // const data = (user)
        // const { error } = schema.validate(data)

        // if(error){
        //     return res.status(400).json({
        //      message: error.details[0].message
        //      })
        //  }

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

const loginUser = asyncHandler(async (req, res) => {
    //desestructuramos los datos del body
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Faltan datos')
    }

    //vamos a buscar a ese usuario
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales Incorrectas')
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
//funcion para generar el JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


module.exports = { 
    userGet,
    userPost,
    loginUser,
    userPut,
    userDel
}
