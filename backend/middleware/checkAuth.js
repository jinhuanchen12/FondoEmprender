import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Token no proporcionado');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");

        if (!req.usuario) {
            throw new Error('Usuario no encontrado');
        }

        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Error de autenticación: ' + error.message });
    }
};

export default checkAuth;
