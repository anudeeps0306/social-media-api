import express from 'express';
import { createPost } from '../controllers/post.js';


const router = express.Router();

router.post("/create", createPost);


export default router;
