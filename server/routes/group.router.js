const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// GET for Group information
router.get('/', rejectUnauthenticated, (req, res) => {
    const userGroupID = req.user.group_id
    const groupQueryText = `SELECT * FROM "group"
    WHERE id = $1`
    pool.query(groupQueryText, [userGroupID])
    .then( (result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error with class GET', err);
      res.sendStatus(500);
    })
  });

  // GET members that are in Group
router.get('/members', rejectUnauthenticated, (req, res) => {
  const userGroupID = req.user.group_id
  const groupQueryText = 
  `SELECT 
  "user".id, 
  user_profile.name, 
  user_profile.about, 
  user_profile.imgpath,
  ARRAY_AGG (allergies.allergy_type) AS allergy_type,
  ARRAY_AGG (dietary_restrictions.restriction_type) AS restriction_type  
  FROM "user_profile"
  LEFT JOIN "user" ON "user".id = "user_profile".user_id
  LEFT JOIN user_allergies ON "user".id = user_allergies.user_id
  LEFT JOIN allergies ON user_allergies.allergy_id = allergies.id
  LEFT JOIN user_dietary_restrictions ON "user".id = user_dietary_restrictions.user_id
  LEFT JOIN dietary_restrictions ON user_dietary_restrictions.user_restriction_id = dietary_restrictions.id
  WHERE "user".group_id = $1
  GROUP BY "user".id, user_profile.name, user_profile.about, user_profile.imgpath
  ORDER BY user_profile.name DESC;`
  pool.query(groupQueryText, [userGroupID])
  .then( (result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    console.log('Error with class GET', err);
    res.sendStatus(500);
  })
});

module.exports = router;