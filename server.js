const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const cors = require("cors");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- FILE UPLOAD ---------------- */

const upload = multer({
    dest: "uploads/"
});

/* ---------------- MONGODB CONNECTION ---------------- */

mongoose.connect("mongodb://127.0.0.1:27017/resumeDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

/* ---------------- SCHEMA ---------------- */

const ResumeSchema = new mongoose.Schema({
    resume: String,
    skills_found: [String],
    missing_skills: [String],
    resume_score: String,
    feedback: String,
    suggestions: [String],
    recommended_roles: [String]
});

const Resume = mongoose.model("Resume", ResumeSchema);

/* ---------------- HOME ROUTE ---------------- */

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer Server Running");
});

/* ---------------- ANALYZE ROUTE ---------------- */

app.post("/analyze", upload.single("resume"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                error: "No resume uploaded"
            });
        }

        /* READ PDF */

        const filePath = req.file.path;
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);

        const resumeText = pdfData.text.toLowerCase();

        /* REQUIRED SKILLS */

        const requiredSkills = ["python", "sql", "react", "node.js"];

        let foundSkills = [];
        let missingSkills = [];

        requiredSkills.forEach(skill => {
            if (resumeText.includes(skill)) {
                foundSkills.push(skill);
            } else {
                missingSkills.push(skill);
            }
        });

        /* SCORE */

        const score = (foundSkills.length / requiredSkills.length) * 100;

        /* FEEDBACK */

        let feedback = "";

        if (score === 100) {
            feedback = "Excellent resume";
        } 
        else if (score >= 75) {
            feedback = "Good resume but can improve";
        } 
        else if (score >= 50) {
            feedback = "Average resume";
        } 
        else {
            feedback = "Needs improvement";
        }

        /* SAVE DATABASE */

        const newResume = new Resume({
            resume: resumeText,
            skills_found: foundSkills,
            missing_skills: missingSkills,
            resume_score: score + "%",
            feedback: feedback
        });

        await newResume.save();

        /* RESPONSE */

        res.json({
            skills_found: foundSkills,
            missing_skills: missingSkills,
            resume_score: score + "%",
            feedback: feedback
        });

    } catch (error) {

        console.log(error);
        res.status(500).send("Error analyzing resume");

    }

});

/* ---------------- SERVER ---------------- */

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});