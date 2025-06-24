import React, { useState } from "react";

export default function Detection() {
  const [headline, setHeadline] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkHeadline = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("https://indian-fake-news-detector.up.railway.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline }),
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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4f46e5, #8b5cf6)",
        padding: "1rem",
      }}
    >
      {}
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 

          minHeight: "350px", 
          justifyContent: "space-between", 
          transition: "min-height 0.3s ease-out", 
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#333",
            marginTop: "0.5rem", 
          }}
        >
          📰 Indian Fake News Detector
        </h1>
        <input
          type="text"
          placeholder="Enter news headline"
          value={headline}
          onChange={(e) => {
            setHeadline(e.target.value);
            setResult(null); 
          }}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            marginBottom: "1.5rem", 
            fontSize: "1rem",
          }}
        />
        <button
          onClick={checkHeadline}
          disabled={loading} 
          style={{
            backgroundColor: "#4f46e5",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.75rem",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer", 
            opacity: loading ? 0.7 : 1, 
            transition: "background-color 0.2s, opacity 0.2s",
            marginBottom: "1.5rem", 
          }}
        >
          {loading ? "Detecting..." : "Detect News"}
        </button>

        {}
        {}
        <div
          style={{
            marginTop: "1rem", 
            width: "100%",

            opacity: result ? 1 : 0,
            height: result ? "auto" : "0",
            overflow: "hidden", 
            transition: "opacity 0.3s ease-in-out, height 0.3s ease-out",
          }}
        >
          {result && result.error ? (
            <p style={{ color: "red", fontWeight: "bold" }}>{result.error}</p>
          ) : result ? ( 
            <div>
              <p
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#4f46e5", 
                }}
              >
                🧠 Prediction:{" "}
                <span
                  style={{
                    color: result.prediction === "Real" ? "green" : "red",
                  }}
                >
                  {result.prediction}
                </span>
              </p>
              <p style={{ marginTop: "0.5rem", fontSize: "0.95rem", color: "#555" }}>Confidence:</p>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                Fake: {parseFloat(result.confidence.Fake).toFixed(2)}% | Real: {parseFloat(result.confidence.Real).toFixed(2)}%
              </p>
            </div>
          ) : (

            <div style={{ minHeight: '80px'  }}></div>
          )}
        </div>
      </div>
    </div>
  );
}