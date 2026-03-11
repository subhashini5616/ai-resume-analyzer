import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {

    if (!file) {
      alert("Please select a resume first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/analyze",
        formData
      );

      setResult(res.data);
      setLoading(false);

    } catch (err) {

      setLoading(false);
      alert("Error analyzing resume");

    }

  };

  return (

    <div className="App">

      <div className="container">

        <h1>AI Resume Analyzer</h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <p className="filename">
          {file ? file.name : "No file chosen"}
        </p>

        <button onClick={uploadFile}>
          Analyze Resume
        </button>

        {loading && <p className="loading">Analyzing resume...</p>}

        {result && (

          <div className="result">

            <h2>Resume Score: {result.resume_score}</h2>

            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: result.resume_score }}
              ></div>
            </div>

            <h3>Skills Found</h3>

            <ul className="skills">

              {result.skills_found.map((skill, i) => (
                <li key={i} className="found">
                  ✔ {skill}
                </li>
              ))}

            </ul>

            <h3>Missing Skills</h3>

            <ul className="skills">

              {result.missing_skills.map((skill, i) => (
                <li key={i} className="missing">
                  ✘ {skill}
                </li>
              ))}

            </ul>

            <h3>Feedback</h3>

            <p>{result.feedback}</p>

          </div>

        )}

      </div>

    </div>

  );
}

export default App;