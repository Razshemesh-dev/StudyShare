const db = require("../util/database");

module.exports = class Users {
  constructor(username, email, full_name, password, education_institute, user_role) {
    this.username = username;
    this.email = email;
    this.full_name = full_name;
    this.password = password;
    this.education_institute = education_institute;
    this.user_role = user_role;
  }

  save() {
    return db.execute(
      "INSERT INTO users (username, email, full_name, password, education_institute, user_role) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.username,
        this.email,
        this.full_name,
        this.password,
        this.education_institute,
        this.user_role,
      ]
    );
  }

  static fetchAll() {
    return db.execute(
      "SELECT id, username, email, full_name, education_institute, user_role FROM users"
    );
  }

  static fetchByUsername(username) {
    return db.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
  }

  static fetchByEmail(email) {
    return db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
  }

  static fetchById(id) {
    return db.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
  }
};
