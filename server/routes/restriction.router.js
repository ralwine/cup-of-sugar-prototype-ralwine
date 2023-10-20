const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET to pull restrictions from DB
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "dietary_restrictions";`
  pool.query(queryText)
  .then( (result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log('Error with class GET', err);
    res.sendStatus(500);
  })
});

module.exports = router;