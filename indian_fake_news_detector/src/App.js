import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkHeadline = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Server not reachable or invalid response." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #4f46e5, #8b5cf6)",
      padding: "1rem"
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        maxWidth: "600px",
        width: "100%",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "#333" }}>
          📰 Fake News Detector
        </h1>
        <input
          type="text"
          placeholder="Enter news headline"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            marginBottom: "1rem"
          }}
        />
        <button
          onClick={checkHeadline}
          style={{
            backgroundColor: "#4f46e5",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer"
          }}
        >
          {loading ? "Checking..." : "Check News"}
        </button>

        {result && (
          <div style={{ marginTop: "1.5rem" }}>
            {result.error ? (
              <p style={{ color: "red", fontWeight: "bold" }}>{result.error}</p>
            ) : (
              <div>
                <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  🧠 Prediction:{" "}
                  <span style={{ color: result.prediction === "Real" ? "green" : "red" }}>
                    {result.prediction}
                  </span>
                </p>
                <p style={{ marginTop: "0.5rem" }}>Confidence:</p>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>
                  Fake: {result.confidence.Fake} | Real: {result.confidence.Real}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
