import express, { json } from "express";
import { readFileSync } from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

// Load student data from JSON
const students = JSON.parse(readFileSync("students.json", "utf-8"));


app.use(cors({
    origin: [
        "https://punjabsoft-assign.netlify.app", // Deployed frontend
        "http://localhost:4200",
        "http://localhost:3000",
        "http://localhost:5173" // Local development frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.get("/", (req, res) => {
    res.json({
        message: "Hello from server!"
    });
});
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
