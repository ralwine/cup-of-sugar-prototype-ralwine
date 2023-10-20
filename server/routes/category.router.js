const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET to pull category selections from DB
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "categories"
  ORDER BY category_type ASC;`
  pool.query(queryText)
  .then( (result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log('Error with category GET', err);
    res.sendStatus(500);
  })
});


module.exports = router;