import express from 'express';
import dotenv from 'dotenv';
import ConnectMongo from './db/mongo.js';
import VisaRoutes from './routes/VisaRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️ Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/visa-requirements',VisaRoutes);

// Connect to MongoDB
ConnectMongo();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

