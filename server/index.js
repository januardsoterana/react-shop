const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/../build`));

const path = require('path');

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../build/index.html')); });

app.listen(process.env.PORT || 8080, () => console.log(`listening on ${process.env.PORT || '8080'}`));
