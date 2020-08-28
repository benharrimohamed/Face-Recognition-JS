const express = require('express');
const port = 5000;
const app = express();

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile('/public/index.html', { root: __dirname });
});


app.listen(port, () => console.log('listen at 5000'));