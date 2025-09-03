import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chatbotRoutes from './routes/chatbot.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/bot/v1', chatbotRoutes);
// Start server
app.get('/', (req, res) => {
  res.send('Chatbot API');
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
