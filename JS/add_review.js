document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const authorInput = form.querySelector("input[name='author_name']");
  const ratingInput = form.querySelector("input[name='rating']");

  form.addEventListener("submit", (e) => {
    let valid = true;
    let messages = [];

    const author = authorInput.value.trim();
    if (!author) {
      valid = false;
      messages.push("נא להזין שם כותב.");
    } else if (author.length > 25) {
      valid = false;
      messages.push("שם הכותב לא יכול להכיל יותר מ-25 תווים.");
    }

    const rating = Number(ratingInput.value);
    if (!rating || rating < 1 || rating > 5) {
      valid = false;
      messages.push("דירוג חייב להיות בין 1 ל-5.");
    }

    if (!valid) {
      e.preventDefault();
      alert(messages.join("\n"));
    }
  });
});
