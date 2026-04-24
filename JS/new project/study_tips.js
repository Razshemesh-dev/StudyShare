const actionButton = document.getElementById('actionButton');
const statusMessage = document.getElementById('statusMessage');
const tipCard = document.getElementById('tipCard');
const saveTipButton = document.getElementById('saveTipButton');
const userTip = document.getElementById('userTip');
const tipsList = document.getElementById('tipsList');

const tips = [
    'פצל את הלמידה ל-25 דקות ואז הפסקה קצרה.',
    'כתוב סיכום קצר של כל פרק לאחר הקריאה.',
    'בחר מקום שקט שבו יש לך גישה למים וקפה.',
    'שנה את נושא הלמידה כל כמה פסקאות כדי לשמור רעננות.'
];
let currentTip = 0;

if (actionButton && statusMessage && tipCard) {
    actionButton.addEventListener('click', () => {
        currentTip = (currentTip + 1) % tips.length;
        statusMessage.textContent = `טיפ חדש: ${tips[currentTip]}`;
        tipCard.classList.toggle('highlight');
    });
}

if (saveTipButton && userTip && tipsList) {
    saveTipButton.addEventListener('click', () => {
        const newTip = userTip.value.trim();
        if (!newTip) {
            statusMessage.textContent = 'אנא כתוב טיפ קצר לפני ההוספה.';
            return;
        }

        const li = document.createElement('li');
        li.textContent = newTip;
        tipsList.appendChild(li);
        userTip.value = '';
        statusMessage.textContent = 'הטיפ נוסף לרשימה בהצלחה.';
    });
}
