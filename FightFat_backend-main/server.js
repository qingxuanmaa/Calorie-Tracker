import express from 'express';
import cors from 'cors';
import cals from './api/calorieItems.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/fightFat", cals);
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"});
})

export default app;