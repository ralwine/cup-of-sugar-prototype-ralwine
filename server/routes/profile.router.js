const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const cloudinaryUpload = require('../modules/cloudinary-config');
const pool = require('../modules/pool');
const router = express.Router();

// gets user profile information to display on user profile page
router.get("/", async (req, res) => {
  // sets userCurrent with id
  const userCurrent = req.user.id;
  const connection = await pool.connect()
  try {
    await connection.query('BEGIN');
    //gets all information for the profile page
    const sqlProfileInfo = `
        SELECT 
          name, 
          homemade_pref, 
          about, 
          imgpath, 
          ARRAY_AGG (allergies.allergy_type) AS allergy_type, 
          ARRAY_AGG (dietary_restrictions.restriction_type) AS restriction_type 
        FROM user_profile
        JOIN user_allergies 
        ON user_profile.user_id = user_allergies.user_id
        JOIN allergies 
        ON allergies.id = user_allergies.allergy_id
        JOIN user_dietary_restrictions 
        ON user_profile.user_id = user_dietary_restrictions.user_id
        JOIN dietary_restrictions 
        ON dietary_restrictions.id = user_dietary_restrictions.user_restriction_id
        WHERE user_profile.user_id = $1
        GROUP BY 
          user_profile.name, 
          user_profile.homemade_pref, 
          user_profile.about, 
          user_profile.imgpath;
        `
    const reply = await connection.query(sqlProfileInfo, [userCurrent]);
    await connection.query('COMMIT');
    //   sends object with: {name, homemade_pref, about, imgpath, allergy_type, and diet_type} 
    res.send(reply.rows)
  } catch (error) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  } finally {
    connection.release()
  }
});
//POST to add user profile image to cloudinary, and then information and preferences to user_profile table in DB
router.post('/', cloudinaryUpload.single("image", 
{
  transformation: [
    { width: 450, height: 450, crop: 'fill' },
    { gravity: 'face' },
  ],
}), async (req, res) => {
  const userId = req.user.id
  const [
    name,
    homemade_pref,
    about,
    imgpath,
    allergy_type,
    restriction_type
  ]
    =
    [
      req.body.name,
      req.body.homemade_pref,
      req.body.about,
      req.file.path,
      req.body.allergy_type.split(',').map(Number),
      req.body.restriction_type.split(',').map(Number)
    ]
  const connection = await pool.connect()
  try {
    await connection.query('BEGIN');
    // posts user info on user_profile table
    const sqlUserInfo = `INSERT INTO "user_profile"
      ("user_id", "name","homemade_pref", "about", "imgpath")
        VALUES ($1, $2, $3, $4, $5);`
    await connection.query(sqlUserInfo, [userId, name, homemade_pref, about, imgpath])
    //posts user allergy selections to allergies table
    const sqlUserAllergies =
      `INSERT INTO "user_allergies"
      ("user_id", "allergy_id")
      VALUES ($1, $2);`
    for (let allergy of allergy_type) {
      await connection.query(sqlUserAllergies, [userId, allergy])
    }
    //posts user dietary_restrictions to dietary_restrictions table
    const sqlUserDietary =
      `INSERT INTO "user_dietary_restrictions"
      ("user_id", "user_restriction_id")
      VALUES ($1, $2);`
    for (let restriction of restriction_type) {
      await connection.query(sqlUserDietary, [userId, restriction])
    }
    await connection.query('COMMIT');
    res.sendStatus(200);
  }
  catch (err) {
    await connection.query('ROLLBACK');
    console.log(' Transaction Error - completing POST userInfo query', err);
    res.sendStatus(500)
  }
  finally {
    connection.release()
  }
});

// PUT route to make changes to title, descripotion and tags of clip
router.put("/", async (req, res) => {
  // destructures out all the information that will be updated
  const
    [
      id,
      name,
      homemade_pref,
      about,
      imgpath,
      allergy_type,
      restriction_type
    ]
      =
      [
        req.body.id,
        req.body.name,
        req.body.homemade_pref,
        req.body.about,
        req.body.imgpath,
        req.body.allergy_type,
        req.body.restriction_type
      ]
  const connection = await pool.connect()
  try {
    await connection.query('BEGIN');

    // updates info on the user table
    const sqlUpdateUser = `
        UPDATE "user_profile"
        SET name = $2, homemade_pref = $3, about = $4, imgpath = $5
        WHERE id = $1
        ;`
    await connection.query(sqlUpdateUser, [id, name, homemade_pref, about, imgpath])
    // updates info on the allergies table
    const sqlUpdateAllergies = `
        UPDATE allergies
        SET allergy_type = $2
        WHERE id = $1
        ;`
    await connection.query(sqlUpdateAllergies, [id, allergy_type])
    // updates info on the dietary_restrictions table
    const sqlUpdateDietary = `
        UPDATE dietary_restrictions
        SET restriction_type = $2
        WHERE id = $1
        ;`
    await connection.query(sqlUpdateDietary, [id, restriction_type])
    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  } finally {
    connection.release()
  }
});

module.exports = router;