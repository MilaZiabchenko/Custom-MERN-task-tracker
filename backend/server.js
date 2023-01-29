import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import tasks from './routes/tasksRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, './../frontend/build')));
app.use(express.json());
app.use('/api/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

mongoose.set('strictQuery', false);

const connectToDb = uri => mongoose.connect(uri);

const PORT = process.env.PORT || 5005;

const start = async () => {
  try {
    await connectToDb(process.env.MONGO_URI);

    console.log('Successfully connected to MongoDB Atlas!');

    app.listen(PORT, () => {
      console.log(`Listening to requests on port ${PORT}...`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

start();
