import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import prescriptionRouter from './routes/prescriptionRoutes.js';
import hospitalRouter from './routes/hospitalRoute.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/prescription', prescriptionRouter);
app.use('/api/hospital', hospitalRouter);

app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(port, () => console.log(`Server started on port ${port}`));
