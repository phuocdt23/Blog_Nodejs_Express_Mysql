const express = require("express");

const db = require("../data/database");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  const query = `
    INSERT INTO posts(title,summary,body,author_id)
    values (?)
    `;
  const result = await db.query(query, [data]);
  console.log(result);
  res.redirect("posts");
});

router.get("/new-post", async function (req, res) {
  const query = `SELECT * FROM authors`;
  const [authors] = await db.query(query);
  console.log(authors);
  res.render("create-post", { authors: authors });
});

module.exports = router;
