// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const { where } = require('sequelize');

// Routes
module.exports = {
    // Enregistrer un nouvel utilisateur
    register: async function(req, res) {
        try {

            const { username, password, email } = req.body;

            if (!username || !password || !email) {
                return res.status(400).json({
                    message: "Veuillez remplir tous les champs"
                });
            }


            const existingUser = await models.User.findOne({
                where: { username }
            });


            if (existingUser) {
                return res.status(400).json({
                    message: "Ce nom d'utilisateur est déjà utilisé"
                });
            }

            const existingEmail = await models.User.findOne({
                where: { email }
            })

            if (existingEmail) {
                return res.status(400).json({
                    message: "Cet email est déjà utilisé par un utilisateur"
                });
            }


            const hashedPassword = await bcrypt.hash(password, 10);


            const newUser = await models.User.create({
                username,
                password: hashedPassword,
                email
            });


            return res.status(201).json({
                message: "Utilisateur enregistré avec succès",
                user: {
                    id: newUser.id,
                    username: newUser.username
                }
            });


        } catch(err) {

            console.error(err);

            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Authentifier un utilisateur
    login: async function(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    message: "Veuillez remplir tous les champs"
                });
            }

            const user = await models.User.findOne({
                where: { username }
            });

            if (!user) {
                return res.status(400).json({
                    message: "Nom d'utilisateur incorrect"
                });
            }

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {
                return res.status(400).json({
                    message: "Mot de passe incorrect"
                });
            }

            const token = jwtUtils.generateToken(user);

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 1000
            });

            return res.status(200).json({
                message: "Authentification réussie",
                user: user.username
            });

        } catch(err) {
            console.error(err);

            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Récupérer le profil de l'utilisateur connecté
    getProfile: async function(req, res) {
        try {
            const token = req.cookies.access_token;
            const decodedToken = jwtUtils.decodeToken(token);
            console.log("Token décodé:", decodedToken);

            const user = await models.User.findByPk(decodedToken.id);
            return res.status(200).json({
                message: "Profil utilisateur récupéré avec succès",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Déconnecter l'utilisateur
    logout: async function(req, res) {
        try {
            res.clearCookie("access_token");
            return res.status(200).json({
                message: "Déconnexion réussie"
            });
        } catch(err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }
};