import express, { Router } from 'express'
import { getAllData } from '../controllers/getAllData.ts'
import { createJob } from '../controllers/createJob.ts'
import { deleteJobByID } from '../controllers/deleteJobById.ts'
import { updateJob } from '../controllers/updateJob.ts'
import {Request, Response} from 'express'

export const apiRouter: Router = express.Router()

apiRouter.route('/')
    .get(async (req: Request, res: Response) => {
        await getAllData(req, res) //gets all jobs - TESTED and Works
    }) 
    .post(async (req: Request, res: Response) => {
        await createJob(req, res) //creates a new job
    })  
    

// apiRouter.route('/:id')
//     .put(async (req: Request, res: Response) => {
//         await updateJob(req, res)// Updates a job by ID
//     })
//     .delete(async (req: Request, res: Response) => {
//         await deleteJobByID(req, res) // Deletes a job by ID
//     })  
