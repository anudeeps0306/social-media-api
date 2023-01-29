import Post from '../model/Post.js';
import jwt from 'jsonwebtoken';


export const createPost = async (req, res) => {
    const { title, description,user } = req.body;
    const token = req.cookies.jwt;
    const decoded = jwt.decode(token);
    // const username = decoded.user;
    

    if(!token) return res.status(401).json({message: "Unauthenticated"});
    console.log(decoded.user.email);
    // if(username != user) return res.status(401).json({message: "Please login in which appropriate account"});
    const newPost = new Post({ title, description,user});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}