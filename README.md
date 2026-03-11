# AI Resume Analyzer

An AI-powered web application that analyzes resumes and provides feedback based on required skills.

## Features

- Upload resume in PDF format
- Extract skills from resume
- Compare with required skills
- Resume score calculation
- Feedback for improvement

## Tech Stack

Frontend:
- React
- CSS
- Axios
- React Dropzone

Backend:
- Node.js
- Express.js
- Multer
- PDF-Parse

## Project Structure

ai-resume-analyzer
│
├── server.js
├── package.json
├── uploads
│
└── resume-frontend
    ├── src
    ├── public
    └── package.json

## How to Run the Project
npm install
node server.js

Runs on:
http://localhost:5000/

### Frontend
cd resume-frontend
npm install
npm start
http://localhost:3000/


## Output Example

The application will show:

- Resume Score
- Skills Found
- Missing Skills
- Feedback

Example:

Resume Score: 50%

Skills Found:
- Python
- SQL

Missing Skills:
- React
- Node.js

Feedback:
Average resume.

## Future Improvements

- AI based resume suggestions
- Job description matching
- Resume keyword optimization
- UI improvements

## Author

Subhashini

### Backend
