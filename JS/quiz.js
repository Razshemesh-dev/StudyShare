const ANSWERS = { q1: "b", q2: "a", q3: "a" };

function gradeQuiz() {
  let score = 0;

  // Reset styling
  $("#quiz label").removeClass("correct incorrect");

  Object.keys(ANSWERS).forEach(q => {
    const correct = ANSWERS[q];
    const chosen = $(`input[name="${q}"]:checked`).val();

    if (!chosen) return;

    const $chosenLabel = $(`input[name="${q}"][value="${chosen}"]`).closest("label");
    const $correctLabel = $(`input[name="${q}"][value="${correct}"]`).closest("label");

    if (chosen === correct) {
      score++;
      $chosenLabel.addClass("correct");
    } else {
      $chosenLabel.addClass("incorrect");
      $correctLabel.addClass("correct");
    }
  });

  $(".score").text(`ציון: ${score}/3`);
}

function resetQuiz() {
  $("#quiz")[0].reset();
  $("#quiz label").removeClass("correct incorrect");
  $(".score").text("ציון: —");
}

$("#gradeBtn").on("click", gradeQuiz);
$("#resetBtn").on("click", resetQuiz);
