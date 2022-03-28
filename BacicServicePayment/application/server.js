import app from './lib/app';
import bodyParser from 'body-parser';
import homeRouter from './routes/home';
import dashboard from './routes/dashboard';
import path from 'path';

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use("/", homeRouter);
app.use("/home", homeRouter);
app.use("/dashboard", dashboard);


app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
