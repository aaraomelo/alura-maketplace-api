import express from 'express';
import consign from 'consign';

const app = express();

consign({
    cwd: __dirname
})
    .include('libs/config.js')
    .include('libs/authenticationToken.js')
    .then('db.js')
    .then('libs/middlewares.js')
    .then('libs/token.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app)


