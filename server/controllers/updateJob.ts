import { Request, Response } from 'express'
import { jobs } from '../data/data'
import { v4 as uuidv4 } from 'uuid'
export const updateJob = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    // Check if the job exists
    let jobToUpdate = jobs.findIndex((job) => job.id === id)
    if (jobToUpdate === -1) {
        res.status(404).json({ error: `Job with id ${id} not found` })
        return
    }

    //only works if all of the fields are provided
    const { companyName, jobTitle, applicationStatus, applicationDate, notes } = req.body
    // Validate required fields
    if (!companyName || !jobTitle || !applicationStatus || !applicationDate || !notes) {
        res.status(404).json({
            error: 'Missing required fields. Please provide companyName, jobTitle, applicationStatus, and applicationDate'
        })
        return
    }
    // Update the job
    jobs[jobToUpdate].companyName = companyName
    jobs[jobToUpdate].jobTitle = jobTitle
    jobs[jobToUpdate].applicationStatus = applicationStatus
    jobs[jobToUpdate].applicationDate = applicationDate
    jobs[jobToUpdate].notes = notes
    // Return the updated job
    res.status(200).json(jobs)
}