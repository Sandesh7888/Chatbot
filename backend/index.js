import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import chatbotRoutes from './routes/chatbot.route.js';  


const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

// database connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// routes
app.use("/bot/v1/", chatbotRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
