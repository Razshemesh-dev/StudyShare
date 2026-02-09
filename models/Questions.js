const db = require("../util/database");

module.exports = class Questions {
  constructor(question_text, answer_text, subject, author_name, education_institute, difficulty_level) {
    this.question_text = question_text;
    this.answer_text = answer_text;
    this.subject = subject;
    this.author_name = author_name;
    this.education_institute = education_institute;
    this.difficulty_level = difficulty_level;
  }

  addNewQuestion() {
    return db.execute(
      "INSERT INTO questions (question_text, answer_text, subject, author_name, education_institute, difficulty_level) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.question_text,
        this.answer_text,
        this.subject,
        this.author_name,
        this.education_institute,
        this.difficulty_level,
      ]
    );
  }

  static fetchAll() {
    return db.execute(
      "SELECT id, question_text, answer_text, subject, author_name, education_institute, difficulty_level, created_at FROM questions ORDER BY created_at DESC"
    );
  }

  static fetchBySubject(subject) {
    return db.execute(
      "SELECT * FROM questions WHERE subject = ? ORDER BY id DESC",
      [subject]
    );
  }

  static fetchByAuthor(author_name) {
    return db.execute(
      "SELECT * FROM questions WHERE author_name = ? ORDER BY id DESC",
      [author_name]
    );
  }
};
