import express from 'express';

import { router as indexRouter } from './routes/index.js';
import { router as usersRouter } from './routes/users.js';

const app = express();

app.use(logger(process.env.NODE_ENV));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000, () => console.log("Server ready on port 3000."));