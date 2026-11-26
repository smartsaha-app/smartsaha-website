// Import
const express = require('express');
const authMiddleware = require('./middleware/authMiddleware');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogController = require('./controllers/blogController');
const portfolioController = require('./controllers/portfolioController');
const complaintController = require('./controllers/complaintController');
const developerController = require('./controllers/developerController');
const taskController = require('./controllers/taskController');
const uploadService = require('./services/uploadService');

// Définition des routes
exports.router = (function() {
    const router = express.Router();

    // Public routes
    router.route('/categories/list').get(categoryController.getAllCategories);
    router.route('/blogs/list').get(blogController.getAllBlogs);
    router.route('/blogs/:id').get(blogController.getBlogById);
    router.route('/portfolios/list').get(portfolioController.getAllPortfolios);
    router.route('/portfolios/:id').get(portfolioController.getPortfolioById);
    router.route('/forgot-password').post(userController.forgotPassword);

    // User routes
    router.route('/users/register').post(userController.register);
    router.route('/users/login').post(userController.login);
    router.route('/users/profile').get(authMiddleware, userController.getProfile);
    router.route('/users/profile').put(authMiddleware, userController.updateProfile);
    router.route('/users/profile/password').put(authMiddleware, userController.updatePassword);
    router.route('/users/logout').post(authMiddleware, userController.logout);

    // Category routes
    router.route('/categories').get(authMiddleware, categoryController.getAllCategories);
    router.route('/categories').post(authMiddleware, categoryController.addCategory);
    router.route('/categories/:id').delete(authMiddleware, categoryController.deleteCategory);

    // Blog routes
    router.route('/blogs').get(authMiddleware, blogController.getAllBlogs);
    router.route('/blogs').post(authMiddleware, uploadService("blogs").single("image"), blogController.addBlog);
    router.route('/blogs/:id').delete(authMiddleware, blogController.deleteBlog);

    // Portfolio routes
    router.route('/portfolios').get(authMiddleware, portfolioController.getAllPortfolios);
    router.route('/portfolios').post(authMiddleware, uploadService("portfolio").fields([
        {
            name: "cover_image",
            maxCount: 1
        },
        {
            name: "gallery",
            maxCount: 10
        }
    ]), portfolioController.addPortfolio);
    router.route('/portfolios/:id').delete(authMiddleware, portfolioController.deletePortfolio);

    // Complaint routes (l'envoi d'une plainte est public, le reste est réservé aux admins)
    router.route('/complaints').post(complaintController.addComplaint);
    router.route('/complaints').get(authMiddleware, complaintController.getAllComplaints);
    router.route('/complaints/:id').get(authMiddleware, complaintController.getComplaintById);
    router.route('/complaints/:id').delete(authMiddleware, complaintController.deleteComplaint);
    router.route('/complaints/:id/notify').post(authMiddleware, complaintController.notifyDevelopers);

    // Developer routes
    router.route('/developers').get(authMiddleware, developerController.getAllDevelopers);
    router.route('/developers').post(authMiddleware, developerController.addDeveloper);
    router.route('/developers/:id').put(authMiddleware, developerController.updateDeveloper);
    router.route('/developers/:id').delete(authMiddleware, developerController.deleteDeveloper);

    // Task routes
    router.route('/tasks').get(authMiddleware, taskController.getAllTasks);
    router.route('/tasks').post(authMiddleware, taskController.addTask);
    router.route('/tasks/:id').put(authMiddleware, taskController.updateTask);
    router.route('/tasks/:id').delete(authMiddleware, taskController.deleteTask);
       
    return router;
})();