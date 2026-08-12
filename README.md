# 🛡️ SafeGuard

### RAKSHA ----- AI-Powered Women Safety Web Application

SafeGuard is a full-stack women safety web application designed to provide users with quick access to emergency assistance, trusted emergency contacts, location sharing, and an AI-powered safety chatbot.

The application combines a **React.js frontend**, **Node.js/Express backend**, **MySQL database**, and a **Python Flask NLP service powered by DistilBERT** to create an integrated safety-support platform.

---

## ✨ Key Features

### 🔐 User Authentication

* User registration and login
* Password hashing using **bcrypt**
* Secure storage of user credentials
* User-specific dashboard

### 🚨 Emergency SOS

* Quick-access SOS functionality
* Emergency event logging
* Retrieval of user's emergency contacts
* Emergency assistance workflow

### 👥 Emergency Contacts

* Add trusted emergency contacts
* Store contacts in the MySQL database
* Retrieve contacts for emergency assistance

### 📍 Location Sharing

* Uses browser geolocation
* Generates a Google Maps location link
* Allows the user's current location to be shared during an emergency

### 🤖 AI Safety Chatbot

SafeGuard includes an NLP-based chatbot powered by a fine-tuned **DistilBERT sequence-classification model**.

The chatbot identifies safety-related user intent and provides contextual responses and follow-up options.

Supported intent categories include:

* `EMERGENCY`
* `NON_EMERGENCY`
* `PREVENTIVE`
* `SAFETY`

The NLP service also includes a lightweight fallback mechanism for common safety-related keywords.

### 🗄️ Database

The backend uses **MySQL** to manage application data such as:

* Users
* Emergency contacts
* SOS logs

---

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      React Client    │
                         │    localhost:3000    │
                         └──────────┬───────────┘
                                    │
                         ┌──────────┴───────────┐
                         │                      │
                         ▼                      ▼
              ┌──────────────────┐   ┌──────────────────┐
              │ Node.js + Express │   │ Python + Flask   │
              │   localhost:5000  │   │   localhost:8000 │
              └────────┬─────────┘   └────────┬─────────┘
                       │                      │
                       ▼                      ▼
              ┌──────────────────┐   ┌──────────────────┐
              │      MySQL       │   │    DistilBERT    │
              │     Database     │   │   NLP Classifier │
              └──────────────────┘   └──────────────────┘
```

The project is divided into three major services:

| Component   | Technology                | Purpose                                            |
| ----------- | ------------------------- | -------------------------------------------------- |
| Frontend    | React.js                  | User interface and application interaction         |
| Backend     | Node.js, Express.js       | Authentication, contacts, SOS and database APIs    |
| Database    | MySQL                     | Persistent application data                        |
| NLP Service | Python, Flask, DistilBERT | Safety intent classification and chatbot responses |

---

## 🛠️ Technology Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* React Router

### Backend

* Node.js
* Express.js
* bcrypt
* CORS

### Database

* MySQL
* MySQL Workbench

### AI / NLP

* Python
* Flask
* Flask-CORS
* PyTorch
* Hugging Face Transformers
* DistilBERT

### Development Tools

* Visual Studio Code
* Git
* GitHub
* npm

---

## 📂 Project Structure

```text
major_project/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── server/
│   ├── config/
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
│
├── nlp/
│   ├── model/
│   ├── results/
│   ├── app.py
│   ├── dataset.csv
│   ├── generate_dataset.py
│   ├── labels.json
│   └── train.py
│
├── .gitignore
└── README.md
```

> **Note:** The trained `model.safetensors` file is excluded from the Git repository because of its large file size. The NLP application expects the trained model to be available locally inside `nlp/model/`.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/yukj352/major_project.git
cd major_project
```

---

## 2. Set Up the React Frontend

Open a terminal:

```bash
cd client
npm install
npm start
```

The React application runs at:

```text
http://localhost:3000
```

---

## 3. Set Up the Node.js Backend

Open a **second terminal**:

```bash
cd server
npm install
node app.js
```

The Node.js backend should run on the port configured in `server/app.js`.

---

## 4. Set Up the Python NLP Service

Open a **third terminal**:

```bash
cd nlp
```

Create and activate a Python virtual environment if required:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install flask flask-cors torch transformers
```

Then start the NLP service:

```bash
python app.py
```

The Flask NLP service runs on:

```text
http://127.0.0.1:8000
```

The chatbot prediction endpoint is:

```text
POST /predict
```

---

# 🧠 NLP Pipeline

The chatbot follows this general pipeline:

```text
User Message
     │
     ▼
DistilBERT Tokenizer
     │
     ▼
DistilBERT Sequence Classifier
     │
     ▼
Intent Prediction
     │
     ├── EMERGENCY
     ├── NON_EMERGENCY
     ├── PREVENTIVE
     └── SAFETY
     │
     ▼
Contextual Response
     │
     ▼
Follow-up Options
```

The Flask service loads the locally trained DistilBERT model and tokenizer, predicts the user's intent, and returns a response with relevant options.

---

# 🔌 API Overview

### Authentication

```text
POST /register
```

Registers a new user and securely hashes the password using bcrypt.

### NLP Prediction

```text
POST /predict
```

Example request:

```json
{
  "text": "I feel unsafe, someone is following me"
}
```

The NLP service returns the predicted safety response and available follow-up options.

### Other Backend APIs

The Node.js backend provides application APIs for authentication, emergency contacts, SOS events, and related database operations.

---

# 🗃️ Database

The application uses MySQL for persistent storage.

Major entities include:

```text
users
contacts
sos_logs
```

### Users

Stores registered user information.

### Contacts

Stores trusted emergency contacts associated with users.

### SOS Logs

Stores emergency/SOS events for record keeping.

---

# 🔒 Security Considerations

* Passwords are hashed using bcrypt before storage.
* Database credentials should be kept outside the source code.
* Environment variables should be used for sensitive configuration.
* Large trained model files are excluded from Git using `.gitignore`.
* Do not commit API keys, passwords, or other credentials.

---

# ⚠️ Current Limitations

* The trained DistilBERT model is not included in the GitHub repository because of its large size.
* The project currently requires the frontend, Node.js backend, and Python NLP service to be started separately.
* Production deployment and cloud hosting are not included in the current setup.
* Emergency notification integrations may require additional configuration depending on the deployment environment.

---

# 🔮 Future Enhancements

* JWT-based authentication
* Real-time emergency notifications
* SMS and WhatsApp integration
* Live location tracking
* Google Maps integration with continuous location updates
* Cloud deployment
* Improved NLP training dataset
* Voice-based emergency assistance
* Mobile application version
* Admin dashboard for SOS monitoring

---

# 🎓 Project Objective

The primary objective of SafeGuard is to develop an integrated digital safety platform that combines **full-stack web development, database management, geolocation services, and artificial intelligence** to assist users in safety-related situations.

The project demonstrates the integration of:

```text
Frontend Development
        +
Backend Development
        +
Database Management
        +
Artificial Intelligence / NLP
        +
Geolocation
        ↓
   SafeGuard
```

---

# 👩‍💻 Author

**Yukta Choudhary**

B.Tech Computer Science Engineering

**Vaidika Nikhoriya**
B.Tech Computer Science Engineering


---

## 📌 Repository

**GitHub:**
https://github.com/yukj352/major_project

---

## ⭐ Acknowledgement

This project was developed as a major academic project to explore the practical integration of **React.js, Node.js, Express.js, MySQL, Python, Flask, PyTorch, and Transformer-based NLP models** in a real-world safety-oriented application.
