const db = require("../util/database");

module.exports = class TeamApplication {
  constructor(full_name, email_adress, interest_area, about_you, type_of_degree, degree_title, hours_per_week) {
    this.full_name = full_name;
    this.email_adress = email_adress;
    this.interest_area = interest_area;
    this.about_you = about_you;
    this.type_of_degree = type_of_degree;
    this.degree_title = degree_title;
    this.hours_per_week = hours_per_week;
  }

  save() {
    return db.execute(
      "INSERT INTO join_team_requests (full_name, email_adress, interest_area, about_you, type_of_degree, degree_title, hours_per_week) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        this.full_name,
        this.email_adress,
        this.interest_area,
        this.about_you,
        this.type_of_degree,
        this.degree_title,
        this.hours_per_week,
      ]
    );
  }

  static fetchAll() {
    return db.execute(
      "SELECT * FROM join_team_requests ORDER BY submission_date DESC"
    );
  }

  static fetchById(id) {
    return db.execute(
      "SELECT * FROM join_team_requests WHERE id = ?",
      [id]
    );
  }
};
