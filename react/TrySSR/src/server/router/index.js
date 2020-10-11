const express = require('express');
const router = express.Router();

let times = 1;
// define the home page route
router.get('/testdata', function(req, res) {
  res.send({
      data:"It's server data"+(times++),
      code:0
  });
});
// define the about route
router.get('/testdata2', function(req, res) {
    res.send({
        data:"It's another server data"+(times++),
        code:0
    });
});

export default router;