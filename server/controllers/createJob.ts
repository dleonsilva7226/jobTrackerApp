import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import { Job, jobs } from '../data/data'
export interface CreateJobRequest {
    companyName: string;
    jobTitle: string;
    applicationStatus: string;
    applicationDate: string;
    notes: string;
}

export const createJob = async (req: Request, res: Response): Promise<void> => {    
    try {
        const { companyName, jobTitle, applicationStatus, applicationDate, notes } = req.body as CreateJobRequest
        // Validate required fields
        if (!companyName || !jobTitle || !applicationStatus || !applicationDate || !notes) {
            res.status(404).json({ 
                error: 'Missing required fields. Please provide companyName, jobTitle, applicationStatus, and applicationDate' 
            })
        }

        //new job
        const newJob: Job = {
            id: uuidv4(),
            companyName: companyName,
            jobTitle: jobTitle,
            applicationStatus: applicationStatus,
            applicationDate: applicationDate,
            notes: notes 
        }
        // Add the new job to the jobs array
        jobs.push(newJob)
        res.status(201).json(jobs)
    } catch (error) {
        console.error('Error creating job:', error)
        res.status(500).json({ error: 'Internal server error' })
    }

}