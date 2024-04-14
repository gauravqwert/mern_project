// express.Router

// In Express.js, express.Router() is a mini Express application without all the server configuration but with the ability to define routes,middlewares,and even have its ownset of route handlers.It allows you to modularize your routes and middleware to keep your code organized and maintainable.

// https://express.js.com/en/guide/routing.html

// Use the express.Router class to create modular,mountable route handlers.A router instance is a complete middleware and routing system; for this reason, if it often referred to as a "mini-app".

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const {signupSchema,loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
router.route("/").get(authController.home);

router.route("/register").post(validate(signupSchema),authController.register); 
router.route("/login").post(validate(loginSchema),authController.login); 
router.route("/user").get(authMiddleware,authController.user);

module.exports = router;