from flask import Flask, request, jsonify
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
import torch
import torch.nn.functional as F
import json
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

print("🚀 Loading model...")

# Load model
model = DistilBertForSequenceClassification.from_pretrained("model")
tokenizer = DistilBertTokenizerFast.from_pretrained("model")

with open("labels.json") as f:
    id2label = json.load(f)

print("✅ Model loaded")


# 🔹 Predict intent (model)
def predict_intent(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)

    probs = F.softmax(outputs.logits, dim=1)
    confidence = torch.max(probs).item()

    pred = torch.argmax(outputs.logits).item()
    intent = id2label.get(str(pred), "UNKNOWN")

    return intent, confidence


# 🔹 Generate response
def generate_response(intent):

    if intent == "EMERGENCY":
        responses = [
            "🚨 This seems urgent.",
            "You might be in danger.",
            "Stay calm, I’m here."
        ]
        options = ["Yes", "No", "Call Help"]

    elif intent == "NON_EMERGENCY":
        responses = [
            "⚠️ That sounds concerning.",
            "Something feels off.",
            "Stay alert."
        ]
        options = ["I feel unsafe", "I'm okay", "Need advice"]

    elif intent == "PREVENTIVE":
        responses = [
            "🧭 Good you're thinking ahead.",
            "Prevention is important."
        ]
        options = ["Safety tips", "Location sharing", "Emergency contacts"]

    elif intent == "SAFETY":
        responses = [
            "✅ Safety habits matter.",
            "Let me guide you."
        ]
        options = ["Apps", "Tips", "Contacts"]

    else:
        return {
            "message": "I'm here to help. Tell me more.",
            "options": []
        }

    return {
        "message": random.choice(responses),
        "options": options
    }


# 🔥 MAIN API
@app.route('/predict', methods=['POST'])
def predict_api():
    data = request.get_json()
    text = data['text']

    # 1️⃣ Model prediction
    intent, confidence = predict_intent(text)

    # 2️⃣ SIMPLE FALLBACK (IMPORTANT FIX 🚨)
    text_lower = text.lower()

    if "help" in text_lower or "danger" in text_lower:
        intent = "EMERGENCY"

    elif "follow" in text_lower or "watch" in text_lower:
        intent = "NON_EMERGENCY"

    elif "safe" in text_lower or "precaution" in text_lower:
        intent = "PREVENTIVE"

    elif "tip" in text_lower or "app" in text_lower:
        intent = "SAFETY"

    # 3️⃣ Generate response
    response_data = generate_response(intent)

    return jsonify({
        "response": response_data["message"],
        "options": response_data["options"]
    })


if __name__ == "__main__":
    app.run(port=8000, debug=True)