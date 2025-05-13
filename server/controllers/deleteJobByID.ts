import { Request, Response } from 'express'
import { Job, jobs } from '../data/jobData.ts'
import { v4 as uuidv4 } from 'uuid'

export const deleteJobByID = async (req: Request, res: Response): Promise<void> => {   
    const { id } = req.params
    // Check if the job exists
    const jobToDelete = jobs.find((job) => job.id === id)
    if (!jobToDelete) {
        res.status(404).json({ error: `Job with id ${id} not found` })
        return
    }
    let newJobsList = jobs.filter((job) => job.id !== id)
    res.status(200).json(newJobsList)
}