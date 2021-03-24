const express = require("express");
const bp = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bp.json());
app.use(cors());

const users = [];
const books = [];

app.post("/register", (req, res) => {
  const randomId = Math.floor(Math.random() * 100000 + 1);
  if ((req.body.email, req.body.password)) {
    if (
      users.some((v) => v.email.toLowerCase() === req.body.email.toLowerCase())
    ) {
      res.send({ status: "This email already exists" });
    } else {
      users.push({
        id: randomId,
        email: req.body.email,
        pass: req.body.password,
      });
      res.send({ status: "Registration ok" });
    }
  } else {
    res.send({ status: "Registration Failed" });
  }
});

app.post("/login", (req, res) => {
  if ((req.body.email, req.body.password)) {
    const user = users.find(
      (v) =>
        v.email.toLowerCase() === req.body.email.toLowerCase() &&
        v.pass === req.body.password
    );
    if (user) {
      res.send({ status: "Login OK", id: user.id });
    } else {
      res.send({ status: "Wrong email or password" });
    }
  } else {
    res.status(400).send({ status: "Data not passed" });
  }
});

app.get("/:id", (req, res) => {
  if (req.params.id) {
    res.send(books.filter((v) => v.userid === Number(req.params.id)));
  } else {
    res.status(400).send({ status: "Data not passed" });
  }
});

app.post("/add", (req, res) => {
  if (req.body.userid && req.body.author && req.body.title) {
    books.push({
      userid: req.body.userid,
      author: req.body.author,
      title: req.body.title,
    });
    res.send({ status: "Book added - OK" });
  } else {
    res.status(400).send({ status: "Data not passed" });
  }
});

app.listen(5000, () => console.log("It works"));
