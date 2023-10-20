const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const cloudinaryUpload = require('../modules/cloudinary-config');
const pool = require('../modules/pool');
const router = express.Router();

// GET for ALL of group's offer posts for activity feed
router.get('/', rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `
    SELECT
      offers.*, 
      user_profile1.name AS name, 
      user_profile2.name AS claimed_by_user_name,
      "user".username,
      "group".share_location
    FROM "offers"
    LEFT JOIN user_profile AS user_profile1 
    ON offers.user_id = user_profile1.user_id
    LEFT JOIN user_profile AS user_profile2 
    ON offers.claimed_by_user = user_profile2.user_id
    JOIN "user"
    ON offers."user_id" = "user".id
    JOIN "group"
    ON offers.group_id = "group".id
    WHERE "user".group_id = $1;
        `
    pool.query(queryText, [req.user.group_id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error with GET for group offer activity', err);
        res.sendStatus(500);
      })
  }
  else {
    res.sendStatus(403);
  }
});

// POST to add a new offer
router.post('/', rejectUnauthenticated,
  cloudinaryUpload.single("image"),
  async (req, res) => {
    const userId = req.user.id;
    const groupId = req.user.group_id;
    const imgPath = req.file.path;
    const categoryId = req.body.category_type;
    const itemName = req.body.item_name;
    const itemDescription = req.body.description;
    const perishableItem = req.body.perishable;
    const homemadeItem = req.body.homemade;
    const offerDate = req.body.offered_on;
    const bestByDate = req.body.best_by;
    const expiryDate = req.body.expires_on;
    const connection = await pool.connect()
    try {
      await connection.query('BEGIN');
      // use the newly returned category id to add the new offer
      const addNewOffer = `
      INSERT INTO offers
        (user_id, 
          group_id, 
          category_id, 
          item_name, 
          description, 
          perishable, 
          homemade, 
          imgpath, 
          offered_on, 
          best_by, 
          expires_on)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, 
          TO_TIMESTAMP($9, 'Dy Mon DD YYYY HH24:MI:SS'), 
          TO_TIMESTAMP($10, 'Dy, DD Mon YYYY HH24:MI:SS'), 
          TO_TIMESTAMP($11, 'Dy, DD Mon YYYY HH24:MI:SS'));
        `
      await connection.query(
        addNewOffer,
        [
          userId,
          groupId,
          categoryId,
          itemName,
          itemDescription,
          perishableItem,
          homemadeItem,
          imgPath,
          offerDate,
          bestByDate,
          expiryDate
        ])
      await connection.query('COMMIT');
      res.sendStatus(200);
    } catch (error) {
      await connection.query('ROLLBACK');
      console.log('Error adding new offer - rolling back offer', error)
      res.sendStatus(500);
    } finally {
      connection.release()
    }
  });

router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const activityId = req.params.id;
  const imgPath = req.body.imgPath;
  const categoryId = req.body.category_id;
  const itemName = req.body.item_name;
  const itemDescription = req.body.description;
  const perishableItem = req.body.perishable;
  const homemadeItem = req.body.homemade;
  const offerDate = req.body.offered_on;
  const bestByDate = req.body.best_by;
  const expiryDate = req.body.expires_on;
  const connection = await pool.connect()
  try {
    await connection.query('BEGIN');
    const sqlUpdate = `
      UPDATE offers
      SET 
        item_name = $2, 
        description = $3, 
        category_id = $4, 
        imgPath = $5, 
        perishable = $6, 
        homemade = $7, 
        offered_on = $8, 
        best_by = $9, 
        expires_on = $10
      WHERE id = $1
      ;`
    await connection.query(sqlUpdate, [
      activityId,
      itemName,
      itemDescription,
      categoryId,
      imgPath,
      perishableItem,
      homemadeItem,
      offerDate,
      bestByDate,
      expiryDate
    ])
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

router.put("/claim/:id", rejectUnauthenticated, async (req, res) => {
  console.log('req.body', req.body)
  const claimedById = req.user.id;
  const offerClaimed = req.params.id;
  const claimedOn = new Date();
  console.log('in claim route', claimedById, offerClaimed, claimedOn)

  const connection = await pool.connect()

  try {
    await connection.query('BEGIN');

    const sqlUpdate = `
        UPDATE offers
        SET 
          claimed_by_user = $2, 
          claimed_on = TO_TIMESTAMP($3, 'YYYY MM DD')  
        WHERE id = $1
        ;`
    await connection.query(sqlUpdate, [
      offerClaimed,
      claimedById,
      claimedOn,
    ])
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

router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const offerId = [req.params.id];
  const connection = await pool.connect()
  try {
    await connection.query('BEGIN');
    const sqlDeleteOffer = `
      DELETE FROM offers 
      WHERE id = $1 
      ;`
    await connection.query(sqlDeleteOffer, offerId);
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