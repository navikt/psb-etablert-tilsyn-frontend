const express = require('express');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: 'https://app-q1.adeo.no',
    })
);

app.use(express.static('build'));
app.use(['/isAlive', '/isReady'], (req, res) => {
    res.sendStatus(200);
});

app.use((req, res, next) => {
    console.log(`Request receieved. Responding with ${res.statusCode}`);
    next();
});

const port = 8080;
app.listen(port, (error) => {
    if (error) {
        console.error(error);
    }
    console.log('Listening on port', port);
});
