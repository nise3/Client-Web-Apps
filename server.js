const express = require('express');
const next = require('next');

const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const mainServer = express();
  const instServer = express();

  mainServer.all('*', (req, res) => {
    return handle(req, res);
  });

  instServer.get('/', (req, res) => {
    return app.render(req, res, '/institute', req.query);
  });

  instServer.get('/*', (req, res) => {
    return app.render(req, res, `/institute${req.path}`, req.query);
  });

  instServer.all('*', (req, res) => {
    return handle(req, res);
  });

  mainServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on nise3 : ${port}`);
  });
  instServer.listen(port + 1000, (err) => {
    if (err) throw err;
    console.log(`> Ready on institute : ${port + 1000}`);
  });
});
