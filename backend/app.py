from flask import Flask, request, jsonify
from flask_cors import CORS

import pickle

app = Flask(__name__)
CORS(app)

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "model.pkl")
model = pickle.load(open(model_path, "rb"))

vectorizer_path = os.path.join(BASE_DIR, "vectorizer.pkl")
vectorizer = pickle.load(open(vectorizer_path, "rb"))


@app.route('/')
def home():
    return "Indian Fake News Detector is Running!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    headline = data.get("headline")

    if not headline:
        return jsonify({"error": "No headline provided"}), 400

    vect_headline = vectorizer.transform([headline])

    prediction = model.predict(vect_headline)[0]
    probabilities = model.predict_proba(vect_headline)[0]
    confidence = round(max(probabilities)*100, 2)

    return jsonify({
        "prediction": "Real" if prediction == 1 else "Fake",
        "confidence": {
            "Fake": "{:.2f}%".format(probabilities[0]*100),
            "Real": "{:.2f}%".format(probabilities[1]*100)
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)