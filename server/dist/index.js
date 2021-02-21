"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "movie_reviews",
    port: "3306"
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
db.connect((err) => {
    if (!err) {
        console.log("Connected.");
    }
    else {
        console.log("Connection failed.");
    }
});
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
app.post("/api/insert", (req, res) => {
    const moviewName = req.body.moviewName;
    const movieReview = req.body.movieReview;
    res.send("Hello World Updated: infinity.");
    const sqlInsert = "INSERT INTO movie_reviews (moviewName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [moviewName, movieReview], (err, result) => {
        console.log(result);
    });
});
app.put("/api/update", (req, res) => {
    const name = req.params.moviewName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
    });
});
app.delete("/api/delete/:moviewName", (req, res) => {
    const name = req.params.moviewName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE moviewName = ?";
    db.query(sqlDelete, name, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result);
    });
});
app.listen(3001, function () {
    console.log("App is listening on port 3001");
});
// app.get("/movie_reviews", (req, res) => {
//     db.query("SELECT FROM movie_reviews", (err:any, rows:any, fields:any) => {
//         if (!err) res.send(rows);
//         else console.log(err);
//     });
// });
