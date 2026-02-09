document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[action="/saveQuestion"]');
  const questionInput = form.querySelector('textarea[name="question"]');
  const answerInput = form.querySelector('textarea[name="answer"]');

  form.addEventListener('submit', (e) => {
    const questionText = questionInput.value.trim();
    const answerText = answerInput.value.trim();

    if (questionText.length > 200) {
      alert("השאלה לא יכולה להכיל יותר מ-200 תווים.");
      questionInput.focus();
      e.preventDefault();
      return;
    }

    if (answerText.length > 400) {
      alert("התשובה לא יכולה להכיל יותר מ-400 תווים.");
      answerInput.focus();
      e.preventDefault();
      return;
    }
  });
});
