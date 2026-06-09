# GitHub Profile Analyzer API

## Tech Stack
- Node.js
- Express.js
- MySQL (Railway)
- GitHub API
  
---

## Features
- Fetch GitHub user data
- Store analytics in MySQL
- Get all profiles
- Get single profile
- Prevent duplicate entries

---


## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
  git clone https://github.com/Sarvesh7617/GitHub-user-profiles-analyze-assignment.git
```

### 2. Navigate to backend project directory

```bash
  cd github-analyzer
```

### 3. Install dependencies
```bash
  npm install
```


### 4. 🔐 Environment Variables

Create a .env file in the root of your project and add your mysql credentials:

```bash
  PORT=3000
  
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_mysql_password
  DB_NAME=github_analyzer
  DB_PORT=3306
```

### 5. 🗄️ Setup Database

create the database schema by running the SQL file or executing the following query in your MySQL console:

```sql
CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    public_repos INT,
    followers INT,
    following INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Run development server

```bash
  npm run dev
```

---


## API Routes

### Analyze User
POST /api/v1/github/:username

### Get All Profiles
GET /api/v1/github

### Get Single Profile
GET /api/v1/github/:username
