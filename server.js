const express = require('express');
const port = 5000 || env.process.port;
const app = express();

app.use(express.static('src'))
app.get('/', (req, res) => {
    res.sendFile('/src/index.html', { root: __dirname });
});


app.listen(port);