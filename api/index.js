import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/4f/auth",authRoutes);
app.use("/4f/post",postRoutes);

const CONNECTION_URL = 'mongodb+srv://anudeep:1234@cluster0.dvbq9n0.mongodb.net/4f?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8080;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));