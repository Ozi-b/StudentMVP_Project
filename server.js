const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const { Pool } = require("pg");
const { connectionString } = require("./config");
const pool = new Pool({
  connectionString: connectionString,
});
pool.connect();
app.use(express.json());
app.use(cors());

app.post("/api/mvp/rooms/", (req, res) => {
  async function createRoom() {
    try {
      let queryString = `INSERT INTO rooms (home, type, name) VALUES (${req.body.home}, '${req.body.type}', '${req.body.name}')`;
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  createRoom();
});

app.get("/api/mvp/rooms", (req, res) => {
  async function showRooms() {
    try {
      let queryString = "SELECT * FROM rooms";
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  showRooms();
});

app.delete("/api/mvp/rooms/:id", (req, res) => {
  async function deleteRoom() {
    try {
      let queryString = `DELETE FROM rooms WHERE id=${req.params.id}`;
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  deleteRoom();
});

// inserts a new item in the items table
app.post("/api/mvp/items/", (req, res) => {
  async function createItem() {
    try {
      let queryString = `INSERT INTO items (category, name, room) 
      VALUES (${req.body.category}, '${req.body.name}', ${req.body.room})`;
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  createItem();
});

// updates all values of the item in the items table based off the id
app.put("/api/mvp/items/:id", (req, res) => {
  async function updateItem() {
    try {
      let queryString = `UPDATE items SET category=${req.body.category},
       name='${req.body.name}', room=${req.body.room} 
       WHERE id=${req.params.id}`;
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  updateItem();
});

app.get("/api/mvp/items", (req, res) => {
  async function showItems() {
    try {
      let queryString = "SELECT * FROM items";
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  showItems();
});

// deletes item from the items table
app.delete("/api/mvp/items/:id", (req, res) => {
  async function deleteItem() {
    try {
      let queryString = `DELETE FROM items WHERE id = '${req.params.id}' RETURNING *`;
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  deleteItem();
});

app.get("/api/mvp/category", (req, res) => {
  async function getCategories() {
    try {
      let queryString = "Select * FROM category";
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  getCategories();
});

app.get("/api/mvp/home", (req, res) => {
  async function getHomes() {
    try {
      let queryString = "SELECT * FROM home";
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  getHomes();
});

// inserts a new home into the home table
app.post("/api/mvp/home/", (req, res) => {
  async function insertHome() {
    try {
      let values = [
        req.body.type,
        req.body.name,
        req.body.state,
        req.body.city,
        req.body.zip,
      ];
      let queryString = `INSERT INTO home (type, name, state, city, zip)
       VALUES ($1, $2, $3, $4, $5)`;
      const result = await pool.query(queryString, values);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  insertHome();
});

//Updates the info in a home by id
app.put("/api/mvp/home/:id", (req, res) => {
  async function setHome() {
    try {
      console.log(req.body);
      let queryString = `UPDATE home SET (type, 
        name, state, city, zip) = ('${req.body.type}', 
        '${req.body.name}', '${req.body.state}', 
        '${req.body.city}', ${req.body.zip})
        WHERE id=${req.params.id}`;
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  setHome();
});

app.delete("/api/mvp/home/:id", (req, res) => {
  async function removeHome() {
    try {
      let queryString = `DELETE FROM home WHERE id = ${req.params.id}
      RETURNING *`;
      const result = await pool.query(queryString);
      console.log(result.rows);
      res.send(result.rows);
    } catch (e) {
      console.error(e.stack);
    }
  }
  removeHome();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
