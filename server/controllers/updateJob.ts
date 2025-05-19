import { Request, Response } from 'express'
import { jobs } from '../data/jobData'
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

    // Update the job
    if (companyName !== undefined ) { jobs[jobToUpdate].companyName = companyName }
    if (jobTitle !== undefined) { jobs[jobToUpdate].jobTitle = jobTitle }
    if (applicationStatus !== undefined) { jobs[jobToUpdate].applicationStatus = applicationStatus }
    if (applicationDate !== undefined) { jobs[jobToUpdate].applicationDate = applicationDate }
    if (notes !== undefined) { jobs[jobToUpdate].notes = notes }
    // Return the updated job
    res.status(200).json(jobs[jobToUpdate])
}