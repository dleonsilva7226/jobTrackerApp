import { Request, Response } from 'express'
import { Job, jobs } from '../data/data.ts'
import { v4 as uuidv4 } from 'uuid'

export const deleteJobByID = async (req: Request, res: Response): Promise<void> => {   
    const { id } = req.params
    res.status(200).json({ message: `Job with id ${id} deleted` })
}