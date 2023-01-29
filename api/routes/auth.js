import express from 'express';
import { register, login, logout } from '../controllers/auth.js';

const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.get("/logout", logout);

export default router;
