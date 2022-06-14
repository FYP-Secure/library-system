import {errorMiddleware} from "./middlewares/exceptionMiddleware";

const express = require('express');
const { conf } = require('./config')
import {router as userRouter} from "./routes/user.route";
import {router as bookRouter} from "./routes/book.route";
import {router as borrowRouter} from "./routes/borrow.route";

const app = express();
app.use(express.json());

app.listen(conf.PORT, () => {
    console.log(`Application Listening to Port ${conf.PORT}`)
});

app.use(userRouter);
app.use(bookRouter);
app.use(borrowRouter);

app.use(errorMiddleware);

module.exports = app;