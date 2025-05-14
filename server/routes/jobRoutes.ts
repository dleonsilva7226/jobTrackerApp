import express, { NextFunction, Router } from 'express'
import { getAllData } from '../controllers/getAllData.ts'
import { createJob } from '../controllers/createJob.ts'
import { deleteJobByID } from '../controllers/deleteJobByID.ts'
import { updateJob } from '../controllers/updateJob.ts'
import {Request, Response} from 'express'
import '../.env'

export const jobRouter: Router = express.Router()

jobRouter.route('/')
    .get(async (req: Request, res: Response) => {
        await getAllData(req, res) //gets all jobs - TESTED and Works
    }) 
    .post(async (req: Request, res: Response) => {
        await createJob(req, res) //creates a new job - TESTED and Works
    })  


// that takes a request and response and checks if the token is valid
jobRouter.route('/:id')
    .put(async (req: Request, res: Response) => {
        await updateJob(req, res)// Updates a job by ID - TESTED and Works
    })
    .delete(async (req: Request, res: Response) => {
        await deleteJobByID(req, res) // Deletes a job by ID - TESTED and Works
    })  