import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
dotenv.config();

import { app } from './app';

const start = async () => {
  if (!process.env.MONGO_URL){
    throw new Error("mongo url should be included in the .env file")
  }

  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}!!!!!!!!`);
  });
};

start();
