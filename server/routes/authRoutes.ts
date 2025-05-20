import express, { NextFunction, Router } from 'express'
import {Request, Response} from 'express'
import { authenticateToken } from '../middleware/authenticateToken.ts'
import { authenticateUser } from '../middleware/authenticateUser.ts'
import '../.env';
import { AuthenticatedRequest } from '../interfaces/types.ts';


export const authRouter: Router = express.Router()

// authentication route - TESTED and works
authRouter.route('/login')
    .post((req: Request, res: Response, next: NextFunction) => {
        authenticateUser(req, res, next) // Authenticates a user
    })

// protected route
authRouter.route('/protect')
    .get(authenticateToken, (req: Request, res: Response, next: NextFunction) => {
        res.json((req as unknown as AuthenticatedRequest).user)
    })