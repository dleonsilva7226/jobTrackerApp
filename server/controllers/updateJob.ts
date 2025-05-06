import { Request, Response } from 'express'

export const updateJob = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { companyName, jobTitle, applicationStatus, applicationDate, notes } = req.body
    const updatedJob = {
        id,
        companyName,
        jobTitle,
        applicationStatus,
        applicationDate,
        notes
    }
    res.status(200).json(updatedJob)
    }