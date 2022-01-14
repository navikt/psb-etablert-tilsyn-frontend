import cors from 'cors';
import express from 'express';
import mockedTilsyn from './mocked-data/mockedTilsyn';

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:8484',
    })
);

app.use('/mock/tilsyn', (req, res) => {
    res.send(mockedTilsyn);
});

const port = 8082;
app.listen(port, (error) => {
    if (error) {
        console.error(error);
    }
    console.log('API-mock listening on port', port);
});
