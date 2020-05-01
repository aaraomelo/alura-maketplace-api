import express from 'express';
import consign from 'consign';

const app = express();

consign({
    cwd: __dirname
})
    .include('config/config.js')
    .include('config/authenticationToken.js')
    .then('db.js')
    .then('config/middlewares.js')
    .then('config/token.js')
    .then('routes')
    .then('config/boot.js')
    .into(app)


