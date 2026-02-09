document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form[action="aboutus.php"]');
  
  if (form) {
    const emailInput = document.getElementById("email_adress");
    const hoursInput = document.getElementById("hours_per_week");

    form.addEventListener("submit", (e) => {
      const email = emailInput.value.trim();
      const hours = parseInt(hoursInput.value, 10);

      // Validate the email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("אנא הכנס כתובת אימייל תקינה (למשל: example@email.com)");
        emailInput.focus();
        e.preventDefault();
        return;
      }

      // Validate the hours amount
      if (isNaN(hours) || hours < 1 || hours > 45) {
        alert("שעות זמינות בשבוע צריכות להיות בין 1 ל-45.");
        hoursInput.focus();
        e.preventDefault();
        return;
      }
    });
  }
});
