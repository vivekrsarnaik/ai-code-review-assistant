# AI Code Review Assistant

AI-powered code review platform built using FastAPI, React, OpenAI API, PostgreSQL, and Docker.

## Features

- AI-generated code reviews using OpenAI
- Multi-language support (Python, JavaScript, Java, Go)
- Persistent review history using PostgreSQL
- Dark mode support
- Review management and deletion
- RESTful API built with FastAPI
- Modern React frontend

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- OpenAI API

### Frontend
- React
- Vite
- Tailwind CSS

### Infrastructure
- Docker

---

## Project Structure

```text
ai-code-review-assistant/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── package.json
│
└── README.md
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/vivekrsarnaik/ai-code-review-assistant.git

cd ai-code-review-assistant
```

---

### 2. Start PostgreSQL

```bash
docker run -d \
--name code-review-postgres \
-e POSTGRES_USER=vivek \
-e POSTGRES_PASSWORD=password \
-e POSTGRES_DB=code_review_db \
-p 5433:5432 \
postgres:17
```

---

### 3. Backend Setup

```bash
cd backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
OPENAI_API_KEY=your_api_key_here
```

Run FastAPI:

```bash
uvicorn app.main:app --reload --port 8001
```

Backend API:

```text
http://localhost:8001
```

Swagger Docs:

```text
http://localhost:8001/docs
```

---

### 4. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## API Endpoints

### Review Code

```http
POST /review
```

Request:

```json
{
  "language": "python",
  "code": "def add(a,b): return a+b"
}
```

---

### Get Review History

```http
GET /reviews
```

---

### Delete All Reviews

```http
DELETE /reviews
```

---

## Future Improvements

- User authentication
- Syntax highlighting
- CI/CD pipeline
- Cloud deployment
- Export reviews to PDF

---

## Author

**Vivek Rajkumar Sarnaik**

Portfolio: https://viveksarnaik.com

GitHub: https://github.com/vivekrsarnaik

LinkedIn: https://linkedin.com/in/vivekrsarnaik
