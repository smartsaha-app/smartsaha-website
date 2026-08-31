// Imports
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const { where, Op } = require('sequelize');
const { Resend } = require('resend'); // npm install resend

const resend = new Resend(process.env.RESEND_API_KEY);

// Routes
module.exports = {
    // Enregistrer un nouvel utilisateur
    register: async function (req, res) {
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


        } catch (err) {

            console.error(err);

            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Authentifier un utilisateur
    login: async function (req, res) {
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

            const isProduction = process.env.NODE_ENV === "production";

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
                maxAge: 60 * 60 * 1000
            });

            return res.status(200).json({
                message: "Authentification réussie",
                user: user.username
            });

        } catch (err) {
            console.error(err);

            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Récupérer le profil de l'utilisateur connecté
    getProfile: async function (req, res) {
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
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Déconnecter l'utilisateur
    logout: async function (req, res) {
        try {
            const isProduction = process.env.NODE_ENV === "production";

            res.clearCookie("access_token", {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
            });
            return res.status(200).json({ message: "Déconnexion réussie" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    // Mise à jour du profil utilisateur (username / email)
    updateProfile: async function (req, res) {
        try {
            const token = req.cookies.access_token;
            const decodedToken = jwtUtils.decodeToken(token);

            const user = await models.User.findByPk(decodedToken.id);

            if (!user) {
                return res.status(404).json({
                    message: "Utilisateur introuvable"
                });
            }

            const { username, email } = req.body;

            if (!username && !email) {
                return res.status(400).json({
                    message: "Aucune donnée à mettre à jour"
                });
            }

            // Vérifier que le nouveau username n'est pas déjà pris par un autre utilisateur
            if (username && username !== user.username) {
                const existingUser = await models.User.findOne({
                    where: {
                        username,
                        id: { [Op.ne]: user.id }
                    }
                });

                if (existingUser) {
                    return res.status(400).json({
                        message: "Ce nom d'utilisateur est déjà utilisé"
                    });
                }

                user.username = username;
            }

            // Vérifier que le nouvel email n'est pas déjà pris par un autre utilisateur
            if (email && email !== user.email) {
                const existingEmail = await models.User.findOne({
                    where: {
                        email,
                        id: { [Op.ne]: user.id }
                    }
                });

                if (existingEmail) {
                    return res.status(400).json({
                        message: "Cet email est déjà utilisé par un utilisateur"
                    });
                }

                user.email = email;
            }

            await user.save();

            return res.status(200).json({
                message: "Profil mis à jour avec succès",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Mise à jour de mot de passe (utilisateur connecté)
    updatePassword: async function (req, res) {
        try {
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    message: "Veuillez remplir tous les champs"
                });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({
                    message: "Le nouveau mot de passe doit contenir au moins 6 caractères"
                });
            }

            // L'utilisateur est récupéré depuis le middleware
            const userId = req.user.id;

            const user = await models.User.findByPk(userId);

            if (!user) {
                return res.status(404).json({
                    message: "Utilisateur introuvable"
                });
            }

            // Vérifier l'ancien mot de passe
            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!isMatch) {
                return res.status(400).json({
                    message: "Mot de passe actuel incorrect"
                });
            }

            // Vérifier que le nouveau est différent
            const isSamePassword = await bcrypt.compare(
                newPassword,
                user.password
            );

            if (isSamePassword) {
                return res.status(400).json({
                    message: "Le nouveau mot de passe doit être différent de l'ancien"
                });
            }

            // Hasher le nouveau mot de passe
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;

            await user.save();

            return res.status(200).json({
                message: "Mot de passe mis à jour avec succès"
            });

        } catch (err) {
            console.error("UPDATE PASSWORD ERROR:", err);

            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    },

    // Mot de passe oublié — génère un mot de passe temporaire et l'envoie par email via Resend
    forgotPassword: async function (req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    message: "Veuillez fournir un email"
                });
            }

            const user = await models.User.findOne({ where: { email } });

            // Réponse volontairement identique que l'utilisateur existe ou non,
            // pour éviter de révéler quels emails sont enregistrés
            const genericResponse = {
                message: "Si cet email existe, un nouveau mot de passe a été envoyé"
            };

            if (!user) {
                return res.status(200).json(genericResponse);
            }

            // Génère un mot de passe temporaire lisible (ex: "K7mP2qXvT9wZ")
            const temporaryPassword = crypto.randomBytes(9).toString("base64")
                .replace(/[^a-zA-Z0-9]/g, "")
                .slice(0, 12);

            user.password = await bcrypt.hash(temporaryPassword, 10);
            await user.save();

            await resend.emails.send({
                from: "SmartSaha <no-reply@smart-saha.com>",
                to: user.email,
                subject: "Votre nouveau mot de passe",
                html: `
                    <p>Bonjour ${user.username},</p>
                    <p>Voici votre nouveau mot de passe temporaire :</p>
                    <p style="font-size: 18px; font-weight: bold;">${temporaryPassword}</p>
                    <p>Connectez-vous avec ce mot de passe. Une fois connecté, vous pourrez le changer si vous le souhaitez depuis votre profil.</p>
                    <p>Si vous n'êtes pas à l'origine de cette demande, contactez-nous rapidement.</p>
                `
            });

            return res.status(200).json(genericResponse);

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Erreur serveur"
            });
        }
    }
};