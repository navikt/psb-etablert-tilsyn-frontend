import cors from 'cors';
import express from 'express';
import mockedTilsyn from './mocked-data/mockedTilsyn';
import mockedSykdom from './mocked-data/mockedSykdom';

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
app.use('/mock/sykdom', (req, res) => {
    res.send(mockedSykdom);
});

app.use('/mock/sykdomInnleggelse', (req, res) => {
    res.send({ perioder: [] });
});

const port = 8082;
app.listen(port, () => {
    console.log('API-mock listening on port', port);
});
