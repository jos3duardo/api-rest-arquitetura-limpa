import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
// import 'express-async-errors';
import {pagination} from 'typeorm-pagination';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@errors/AppError';
import '@framework/database';
import uploads from '@config/uploads';
import rateLimiter from '@middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploads.directory))

app.use(routes);

//recebe os erros gerados pelo celebrate
app.use(errors())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
});


app.listen(3333, () => {
    console.log('servidor rodando na porta 3333');
});


