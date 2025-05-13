import express, { NextFunction, Router } from 'express'
import { getAllData } from '../controllers/getAllData.ts'
import { createJob } from '../controllers/createJob.ts'
import { deleteJobByID } from '../controllers/deleteJobByID.ts'
import { updateJob } from '../controllers/updateJob.ts'
import {Request, Response} from 'express'
import { users } from '../data/userData.ts'
import { authenticateToken } from '../middleware/authenticateToken.ts'
import { authenticateUser } from '../middleware/authenticateUser.ts'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import '../.env'

export const apiRouter: Router = express.Router()

// authentication route - TESTED and works
apiRouter.route('/login/:id')
    .post((req: Request, res: Response, next: NextFunction) => {
        authenticateUser(req, res, next) // Authenticates a user
    })

// protected route
apiRouter.route('/protect/:id')
    .get(authenticateToken, (req: Request, res: Response, next: NextFunction) => {
        res.json({
            message: 'PROTECTED ROUTE WORKSSSSSSSSS!',
            authData: (req as any).user
        })
    })

apiRouter.route('/')
    .get(async (req: Request, res: Response) => {
        await getAllData(req, res) //gets all jobs - TESTED and Works
    }) 
    .post(async (req: Request, res: Response) => {
        await createJob(req, res) //creates a new job - TESTED and Works
    })  


// that takes a request and response and checks if the token is valid
apiRouter.route('/:id')
    .put(async (req: Request, res: Response) => {
        await updateJob(req, res)// Updates a job by ID - TESTED and Works
    })
    .delete(async (req: Request, res: Response) => {
        await deleteJobByID(req, res) // Deletes a job by ID - TESTED and Works
    })  