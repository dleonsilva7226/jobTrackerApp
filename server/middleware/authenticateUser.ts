import { NextFunction } from "express";
import { Request, Response } from "express";
import { users } from "../data/userData.ts";
import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();
import '../.env'


export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body
        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }
        const findUser = users.find((user) => user.username === username && user.password === password)
        if (!findUser) {
            res.status(403).json({ message: 'Invalid username or password' });
            return;
        }
        console.log("JWT secret is:", process.env.JWT_SECRET);

        if (!process.env.JWT_SECRET) {
            res.status(500).json({ message: 'JWT secret is not defined' });
            return;
        }

        jwt.sign({
            findUser
        }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err: Error | null, token: string | undefined) => {
            if (err) {
                res.status(500).json({ message: 'Error signing token' });
                return;
            }
            res.status(200).json({ token });
        })

}