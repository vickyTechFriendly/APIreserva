import express from 'express';
import router from './routes/router.js';
import cors from 'cors';
import verified from './middlewares/jwt.js';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.use('/api', router);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
    });