import express, { Application, Request, Response } from "express";

import { userRouter } from "./users/user.route";
import { stateRouter } from "./state/state.route";
import { cityRouter } from "./city/city.route";
import { authRouter } from "./auth/auth.route";
import {mealRouter} from "./meals/meal.route";
import { orderRouter } from "./orders/order.route";
import { rateLimiterMiddleware } from "./middleware/rateLimiter";
import cors from "cors"



const app: Application = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Simple logger middleware
const logger = (req: Request, res: Response, next: Function) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
app.use(logger)
app.use(rateLimiterMiddleware)

//default
app.get('/', (req: Request, res: Response) => {
    res.send("welcome to express API backend with drizzle orm and postgresql")
})

//import routes
app.use('/api', userRouter)
app.use('/api', stateRouter)
app.use('/api', cityRouter)
app.use('/api', authRouter)
app.use('/api', mealRouter)
app.use('/api', orderRouter)

export default app;

