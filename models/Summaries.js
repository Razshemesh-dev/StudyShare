const db = require("../util/database");

module.exports = class Summaries {
  constructor(summary_name, author_name, education_year, education_institute, semester, file_attach) {
    this.summary_name = summary_name;
    this.author_name = author_name;
    this.education_year = education_year;
    this.education_institute = education_institute;
    this.semester = semester;
    this.file_attach = file_attach;
  }

  save() {
    return db.execute(
      "INSERT INTO summaries (summary_name, author_name, education_year, education_institute, semester, file_attach) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.summary_name,
        this.author_name,
        this.education_year,
        this.education_institute,
        this.semester,
        this.file_attach,
      ]
    );
  }

  static fetchAll() {
    return db.execute(
      "SELECT id, summary_name, author_name, education_year, education_institute, semester FROM summaries ORDER BY id DESC"
    );
  }

  static fetchById(id) {
    return db.execute(
      "SELECT * FROM summaries WHERE id = ?",
      [id]
    );
  }

  static fetchByAuthor(author_name) {
    return db.execute(
      "SELECT * FROM summaries WHERE author_name = ? ORDER BY id DESC",
      [author_name]
    );
  }
};
