const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const pool = require("./db");
const app = express();

// Middleware

app.use(cors());
app.use(bodyParser.json());

// Routes

// Create Notification
app.post("/notifications", async (request, response) => {
    try {
        const { description, subject } = request.body
        const { viewed } = false;
        const newNotif = await pool.query("INSERT INTO notifications (description, subject, received_at, viewed) VALUES ($1, $2, now(), $3) RETURNING *",
            [description, subject, viewed]);

        response.json(newNotif.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// Get Notification

app.get("/notifications/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const notif = await pool.query("SELECT * FROM notifications WHERE notif_id = $1", [id]);

        response.json(notif.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// Get All Notifications

app.get("/notifications", async (request, response) => {
    try {
        const allNotifs = await pool.query("SELECT * FROM notifications");

        response.json(allNotifs.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Update A Notification

app.put("/notifications/:id", async (request, response) => {
    try {
        const { id } = request.params
        const { description } = request.body;
        const updateNotif = await pool.query("UPDATE notifications SET description = $1 WHERE notif_id = $2", [description, id]);

        response.json("Notification updated successfully.");
    } catch (error) {
        console.error(error.message);
    }
});

app.put("/notifications/viewed/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const updateNotif = await pool.query("UPDATE notifications SET viewed = $1 WHERE notif_id = $2", [true, id]);

        response.json("Notification updated successfully.");
    } catch (error) {
        console.error(error.message);
    }
});

// Delete A Notification

app.delete("/notifications/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteNotif = await pool.query("DELETE FROM notifications WHERE notif_id = $1", [id]);

        response.json("Notification deleted successfully.");
    } catch (error) {
        console.error(error.message);
    }
});

// Delete All Notifications

app.listen(5000, () => {
    console.log("server has started on port 5000");
});