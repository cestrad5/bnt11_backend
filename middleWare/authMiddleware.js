const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async (req, res, next) => {
    try {
        let token;
        
        // 1. Verificar cookies con configuración específica para iOS
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } 
        // 2. Verificar Authorization header como respaldo
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // 3. Verificar x-access-token header (común en aplicaciones móviles)
        else if (req.headers['x-access-token']) {
            token = req.headers['x-access-token'];
        }

        if (!token) {
            res.status(401);
            throw new Error('Not authorized, please login');
        }

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(verified.id).select('-password');
            
            if (!user) {
                res.status(401);
                throw new Error('User not found');
            }

            // Renovar el token si está próximo a expirar
            const tokenExp = new Date(verified.exp * 1000);
            const now = new Date();
            const fiveMinutes = 5 * 60 * 1000;

            if (tokenExp - now < fiveMinutes) {
                const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '1d'
                });

                // Configuración específica de cookies para iOS
                res.cookie('token', newToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    maxAge: 24 * 60 * 60 * 1000, // 1 día
                    path: '/',
                    domain: process.env.COOKIE_DOMAIN || undefined
                });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Token verification failed');
        }
    } catch (error) {
        res.status(401);
        throw new Error(error.message || 'Not authorized, please login');
    }
});

module.exports = protect;