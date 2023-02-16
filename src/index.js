const express = require('express');
const routes = require('./routes');

require('express-async-errors');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, _request, response, _next) => {
  console.error(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Server started and listening on port 3000'));
