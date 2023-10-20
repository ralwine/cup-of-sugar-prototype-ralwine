const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// POST to add a new request
router.post('/', rejectUnauthenticated, async (req, res) => {
    const userId = req.user.id;
    const groupId = req.user.group_id;   
    const itemName = req.body.item_name;
    const itemDescription = req.body.description;
    const categoryId = req.body.category_type;
    const requestDate = req.body.requested_on;
    const expiryDate = req.body.expires_on;
    const connection = await pool.connect()
    try {
        await connection.query('BEGIN');
        // use the newly returned category id to add the new request
        const addNewRequest = `INSERT INTO requests 
                                (item_name, description, requested_on, expires_on, category_id, user_id, group_id) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7);`
        await connection.query(addNewRequest, [itemName,itemDescription, requestDate, expiryDate, categoryId, userId, groupId])
        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch(error) {
        await connection.query('ROLLBACK;');
        console.log('Error adding new request - rolling back request', error)
        res.sendStatus(500);
    } finally {
        connection.release()
    }
});

// GET for ALL of group's request posts for activity feed
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()){
      const queryText = `
      SELECT 
        requests.*,
        user_profile1.name AS name, 
        user_profile2.name AS fulfilled_by_user_name,
        user_profile1.imgpath,
        "user".username,
        "group".share_location
      FROM "requests"
      LEFT JOIN user_profile AS user_profile1 
      ON requests.user_id = user_profile1.user_id
      LEFT JOIN user_profile AS user_profile2 
      ON requests.fulfilled_by_user = user_profile2.user_id
      JOIN "user"
      ON requests."user_id" = "user".id
      JOIN "group"
      ON requests.group_id = "group".id
      WHERE "user".group_id = $1;
      `
  
      pool.query(queryText, [req.user.group_id])
      .then( (result) => {
      res.send(result.rows);
      })
      .catch((err) => {
        console.log('Error with GET for group request activity', err);
        res.sendStatus(500);
      })}
    else {
      res.sendStatus(403);
    }
  });

  router.put("/:id", rejectUnauthenticated, async (req, res) => {
      const activityId = req.params.id;
      const categoryId = req.body.category_id;
      const itemName = req.body.item_name;
      const itemDescription = req.body.description;
      const requestDate = req.body.requested_on;
      const expiryDate = req.body.expires_on;
      const connection = await pool.connect()   
      try {
        await connection.query('BEGIN');
        const sqlUpdate = `
          UPDATE requests
          SET 
            item_name = $2, 
            description = $3, 
            category_id = $4, 
            requested_on = $5, 
            expires_on = $6
          WHERE id = $1
          ;`
        await connection.query(sqlUpdate, [
          activityId,
          itemName,
          itemDescription,
          categoryId,
          requestDate,
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

    router.put("/fulfill/:id", rejectUnauthenticated, async (req, res) => {
      console.log('req.body in fulfill', req.body)
        const fulfilledById = req.user.id;
        const requestFulfilled = req.params.id;
        const fulfilledOn = new Date();
        console.log('in claim route', fulfilledById, requestFulfilled, fulfilledOn)
    
        const connection = await pool.connect()
      
        try {
          await connection.query('BEGIN');
      
          const sqlUpdate = `
            UPDATE requests
            SET 
              fulfilled_by_user = $2, 
              fulfilled_on = TO_TIMESTAMP($3, 'YYYY MM DD')  
            WHERE id = $1
            ;`
          await connection.query(sqlUpdate, [
            requestFulfilled,
            fulfilledById,
            fulfilledOn,
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
    const requestId = [req.params.id];  
    const connection = await pool.connect()
    try {
      await connection.query('BEGIN');
      const sqlDeleteRequest = `
        DELETE FROM requests 
        WHERE id = $1 
        ;`
      await connection.query(sqlDeleteRequest, requestId);
      
      await connection.query('COMMIT');
      res.sendStatus(200);
    } catch (error) {
      await connection.query('ROLLBACK');
      console.log(`Transaction Error - Rolling back delete request`, error);
      res.sendStatus(500);
    } finally {
      connection.release()
    }
  });

module.exports = router;