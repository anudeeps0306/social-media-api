import User from "../model/User.js";
import mongoose from "mongoose";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password, username } = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const new_d = new User({
                name: name,
                email: email,
                password: hashedPassword,
                username: username
            });
        const dbdata = await new_d.save();
        res.status(200).json(dbdata);
    }
    catch(err){
        res.status(500).send(err);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        //dehash password
        const user = await User.findOne({email: email});
        !user && res.status(404).json("User not found");
        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).json("Wrong password");
        let token = jwt.sign({user: user}, 'thisistoken', {expiresIn: "24h"});
        res.cookie("jwt",token,{
            expires: new Date(Date.now() + 50000),
            httpOnly: true,
        });
        res.status(200).json(token);
    }
    catch(err){
        console.log(err);
    }
};

export const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.send("Logged out");
};

