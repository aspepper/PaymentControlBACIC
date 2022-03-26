import app from './lib/app';
import homeRouter from './routes/home';

app.use("/", homeRouter);
app.use("/home", homeRouter);

app.listen(3000, function () {
    console.log('Node app is running on port 3333');
});
