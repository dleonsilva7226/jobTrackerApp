import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import { jobRouter } from './routes/jobRoutes';
import { authRouter } from './routes/authRoutes';

const PORT: number = 8000;
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes for jobs and authentication
app.use('/jobs', jobRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Job not Found' });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});