const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Load student data from JSON
const students = JSON.parse(fs.readFileSync("students.json", "utf-8"));

// Search API
app.get("/api/students", (req, res) => {
    const query = req.query.query?.toLowerCase() || "";

    if (query.length < 3) return res.json([]); // Lazy loading

    const results = students.filter(student =>
        student.name.toLowerCase().includes(query)
    ).slice(0, 5); // Limit results

    res.json(results);
});

app.listen(5000, () => console.log("Server running on port 5000"));
