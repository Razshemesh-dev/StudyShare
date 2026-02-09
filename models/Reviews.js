const db = require("../util/database");

module.exports = class Reviews {
  constructor(tool_name, review_text, rating, author_name, tool_category, pros_cons) {
    this.tool_name = tool_name;
    this.review_text = review_text;
    this.rating = rating;
    this.author_name = author_name;
    this.tool_category = tool_category;
    this.pros_cons = pros_cons;
  }

  addNewReview() {
    return db.execute(
      "INSERT INTO reviews (tool_name, review_text, rating, author_name, tool_category, pros_cons) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.tool_name,
        this.review_text,
        this.rating,
        this.author_name,
        this.tool_category,
        this.pros_cons,
      ]
    );
  }

  static fetchAll() {
    return db.execute(
      "SELECT id, tool_name, review_text, rating, author_name, tool_category, pros_cons, created_at FROM reviews ORDER BY created_at DESC"
    );
  }

  static fetchByToolName(tool_name) {
    return db.execute(
      "SELECT * FROM reviews WHERE tool_name = ? ORDER BY id DESC",
      [tool_name]
    );
  }

  static fetchByRating(rating) {
    return db.execute(
      "SELECT * FROM reviews WHERE rating >= ? ORDER BY rating DESC",
      [rating]
    );
  }
};
