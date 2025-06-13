import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

# Load dataset
df = pd.read_csv("news_dataset.csv")

# Use 'text' column for training; drop missing values
df = df.dropna(subset=["text", "label"])
X = df["text"]
y = df["label"].apply(lambda x: 1 if x == "REAL" else 0)  # Convert to 0 (fake), 1 (real)

# TF-IDF Vectorization
vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)
X_tfidf = vectorizer.fit_transform(X)

# Train model
model = LogisticRegression()
model.fit(X_tfidf, y)

# Save model and vectorizer
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))
pickle.dump(model, open("model.pkl", "wb"))
