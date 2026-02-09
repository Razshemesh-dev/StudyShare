-- StudyShare Database Setup
-- Create database
CREATE DATABASE IF NOT EXISTS studyshare;
USE studyshare;

-- Table 1: Users (6 columns + id)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    full_name VARCHAR(150) NOT NULL,
    education_institute VARCHAR(150),
    user_role VARCHAR(50) DEFAULT 'student',
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: Summaries (6 columns + id)
CREATE TABLE IF NOT EXISTS summaries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    summary_name VARCHAR(255) NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    education_year VARCHAR(150) NOT NULL,
    education_institute VARCHAR(150),
    semester VARCHAR(50),
    file_attach LONGBLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 3: Questions (6 columns + id)
CREATE TABLE IF NOT EXISTS questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    subject VARCHAR(150) NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    education_institute VARCHAR(150),
    difficulty_level VARCHAR(50) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 4: Reviews (6 columns + id)
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tool_name VARCHAR(150) NOT NULL,
    review_text TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    author_name VARCHAR(100) NOT NULL,
    tool_category VARCHAR(150),
    pros_cons TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table 5: Join Team Requests (for Cpanel)
CREATE TABLE IF NOT EXISTS join_team_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(150) NOT NULL,
    email_adress VARCHAR(100) NOT NULL,
    interest_area VARCHAR(100),
    about_you TEXT,
    type_of_degree VARCHAR(100),
    degree_title VARCHAR(150),
    hours_per_week VARCHAR(50),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_summaries_author ON summaries(author_name);
CREATE INDEX idx_summaries_year ON summaries(education_year);
CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_author ON questions(author_name);
CREATE INDEX idx_reviews_tool ON reviews(tool_name);
CREATE INDEX idx_reviews_author ON reviews(author_name);
CREATE INDEX idx_team_requests_email ON join_team_requests(email_adress);
