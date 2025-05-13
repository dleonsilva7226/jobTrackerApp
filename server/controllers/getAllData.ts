import { Job, jobs } from '../data/jobData.ts'

import { Request, Response } from 'express';

export const getAllData = async (req: Request, res: Response): Promise<void> => {
    let filteredData: Job[] = jobs
    res.json(jobs)
}