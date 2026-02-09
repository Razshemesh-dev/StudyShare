// Countdown timer for team application success page
let seconds = 5;
const countdownElement = document.getElementById('countdown');

const interval = setInterval(() => {
  seconds--;
  countdownElement.textContent = seconds;

  if (seconds <= 0) {
    clearInterval(interval);
    window.location.href = '/';
  }
}, 1000);
