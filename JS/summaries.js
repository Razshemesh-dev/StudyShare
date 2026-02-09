const filterButtons = document.querySelectorAll(".filter-btn");
const summaries = document.querySelectorAll(".summary-item");

// filter
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    summaries.forEach((item) => {
      const itemCategory = item.dataset.category;
      item.style.display = (category === "all" || itemCategory === category) ? "block" : "none";
    });
  });
});

// view summary
document.querySelectorAll(".view-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const summaryName = button.getAttribute("data-summary");
    const viewLink = `/summaries/view/${summaryName}.txt`;
    window.open(viewLink, "_blank");
  });
});

// validate
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("summary_form");
  const fileInput = document.getElementById("file_attach");

  if (!form || !fileInput) return;

  form.addEventListener("submit", function (e) {
    // validate if file exist
    const file = fileInput.files[0];
    if (!file) {
      e.preventDefault();
      alert("יש לצרף קובץ סיכום בפורמט .txt");
      return;
    }
    
    // validate the file is txt
    const fileName = file.name.toLowerCase();
      if (!fileName.endsWith(".txt")) {
        e.preventDefault();
        alert("ניתן להעלות רק קבצים עם סיומת .txt");
        return;
      }

    // validate the year
    const yearInput = document.querySelector('input[name="education_year"]');
    const year = parseInt(yearInput.value);
    const currentYear = 2026;
    if (isNaN(year) || year < currentYear - 50 || year > currentYear) {
      e.preventDefault();
      alert(`שנת הלימוד צריכה להיות בין ${currentYear - 50} ל-${currentYear}`);
      return;
    }

    // validate the semester
    const semesterInput = document.querySelector('input[name="semester"]');
    const semester = semesterInput.value.trim();
    const allowedSemesters = ["א", "ב", "קיץ"];
    if (!allowedSemesters.includes(semester)) {
      e.preventDefault();
      alert("סמסטר חייב להיות אחד מהבאים: א, ב, קיץ");
      return;
    }
  });
});
