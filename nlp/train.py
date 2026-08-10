from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset
import pandas as pd
import json

print("🚀 Starting FAST training...")

# Load dataset
df = pd.read_csv("dataset.csv")
df = df.dropna()
df['text'] = df['text'].str.lower()

print("✅ Dataset loaded:", df.shape)

# Labels
labels = sorted(df['label'].unique())
label2id = {l: i for i, l in enumerate(labels)}
id2label = {i: l for l, i in label2id.items()}

df['label'] = df['label'].map(label2id)

print("✅ Labels:", label2id)

# Convert dataset
dataset = Dataset.from_pandas(df)

# Tokenizer
tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")

def tokenize(example):
    return tokenizer(example['text'], truncation=True, padding=True)

dataset = dataset.map(tokenize, batched=True)

# Split
dataset = dataset.train_test_split(test_size=0.2)

print("🔥 Dataset ready")

# Model (LIGHTWEIGHT ⚡)
model = DistilBertForSequenceClassification.from_pretrained(
    "distilbert-base-uncased",
    num_labels=len(label2id)
)

# Training config (FAST ⚡)
training_args = TrainingArguments(
    output_dir="./results",
    per_device_train_batch_size=16,
    num_train_epochs=2,   # 🔥 reduced epochs
    logging_steps=50,
    save_strategy="no"
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"]
)

print("🔥 FAST Training started...")

trainer.train()

print("💾 Saving model...")

model.save_pretrained("model")
tokenizer.save_pretrained("model")

with open("labels.json", "w") as f:
    json.dump(id2label, f)

print("✅ FAST MODEL TRAINED 🚀")