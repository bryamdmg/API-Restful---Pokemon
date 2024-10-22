const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                msg: 'El usuario ya existe'
            });
        }

        user = new User({ email, password });

        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        const token = jwt.sign({ uid: user.id }, process.env.SECRETORPRIVATEKEY, { expiresIn: '4h' });

        res.json({
            msg: 'Usuario registrado correctamente',
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        const token = jwt.sign({ uid: user._id }, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        });

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ocurrio un error'
        });
    }
}

module.exports = {
    register,
    login
}
