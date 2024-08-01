import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app