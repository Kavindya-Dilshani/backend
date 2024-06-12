import authController from '../controllers/auth.controller.js';



export default function authRoutes(app) {
    // sign up
    app.post(
        `/api/auth/signup`,

        authController.signUp
    );

    // login
    app.post(
        `/api/auth/login`,
        [],
        authController.login
    );
}

