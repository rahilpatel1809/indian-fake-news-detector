import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

df = pd.read_csv("backend/news_dataset.csv")

df = df.dropna(subset=["headline", "label"])
X = df["headline"]
y = df["label"].apply(lambda x: 1 if x == "REAL" else 0)

vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)
X_tfidf = vectorizer.fit_transform(X)

model = LogisticRegression()
model.fit(X_tfidf, y)

pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))
pickle.dump(model, open("model.pkl", "wb"))
