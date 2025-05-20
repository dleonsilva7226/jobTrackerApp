import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import '../.env';
import { NextFunction } from "express-serve-static-core";
import { AuthenticatedRequest } from "../interfaces/types";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    console.log('INFO: Authenticating token');
    const authHeader: string | undefined = req.headers.authorization;
    // doing this because the format for this is Bearer <token>
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.sendStatus(401);
        console.log("ERROR: No token provided");
        return;
    }

    if (!process.env.JWT_SECRET) {
        console.log('ERROR: JWT secret is not defined');
        res.status(500).json({ message: 'JWT secret is not defined' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: Error | null, decoded: any) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
            return;
        } else {
            //adding a new parameter to the request object
            (req as unknown as AuthenticatedRequest).user = decoded.findUser as {
                id: string;
                username: string;
                password: string;
            };

            next();
        }
    });
}