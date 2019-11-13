import path from 'path';
import express from 'express';
import config from './config/config.json';

const DIST_DIR = path.join(__dirname, 'app');

console.debug(DIST_DIR);

var app = express();
app.use(express.static(DIST_DIR));
app.get("*", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
  });
  
  app.listen(config.port);
