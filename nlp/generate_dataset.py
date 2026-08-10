import random
import pandas as pd

# 🎯 Labels
labels = {
    "EMERGENCY": [
        "someone is attacking me",
        "help me please",
        "i am in danger",
        "someone broke into my house",
        "i am being assaulted"
    ],
    "FOLLOWING": [
        "someone is following me",
        "i think someone is stalking me",
        "a man is walking behind me",
        "i feel like i'm being watched",
        "someone is chasing me"
    ],
    "HARASSMENT": [
        "someone is harassing me",
        "he is abusing me",
        "i am getting inappropriate comments",
        "someone is bothering me",
        "i feel uncomfortable with someone"
    ],
    "THREAT": [
        "this place feels unsafe",
        "i am scared right now",
        "someone is yelling threats",
        "this area is dangerous",
        "i feel threatened"
    ],
    "PREVENTION": [
        "how to stay safe at night",
        "give me safety tips",
        "how can i protect myself",
        "ways to stay safe while traveling",
        "safety precautions for women"
    ],
    "SAFE": [
        "i am safe now",
        "everything is okay",
        "i reached home safely",
        "i feel secure",
        "no problem now"
    ]
}

# 🔄 Variations to increase dataset size
prefixes = ["", "please", "urgent", "quick", "help"]
suffixes = ["now", "immediately", "please", "asap", ""]

def generate_sentence(base):
    return f"{random.choice(prefixes)} {base} {random.choice(suffixes)}".strip()

# 📊 Generate dataset
data = []

for label, sentences in labels.items():
    for _ in range(800):  # 800 * 6 ≈ 4800 rows
        base = random.choice(sentences)
        text = generate_sentence(base)
        data.append([text, label])

# Convert to DataFrame
df = pd.DataFrame(data, columns=["text", "label"])

# Shuffle
df = df.sample(frac=1).reset_index(drop=True)

# Save
df.to_csv("dataset.csv", index=False)

print("✅ Dataset generated with", len(df), "rows!")