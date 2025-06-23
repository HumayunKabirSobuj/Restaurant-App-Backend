import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

// application route
app.use('/api', router);


app.get('/', async (req: Request, res: Response) => {
  res.send('Course Learning App server is running...');
});

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
