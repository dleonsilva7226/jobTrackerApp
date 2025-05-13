import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { apiRouter } from './routes/apiRoutes';

const PORT: number = 8000;
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/jobs', apiRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Job not Found' });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});