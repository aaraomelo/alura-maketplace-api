import express from 'express';
import cors from 'cors';

module.exports = app => {
    // settings
    app.set('port', process.env.PORT || 3000)

    // middlewares
    app.use(cors());
    app.use(express.json());

}