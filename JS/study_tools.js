const toolButtons = document.querySelectorAll('.tool-button');
const toolResult = document.getElementById('toolResult');
const saveNoteButton = document.getElementById('saveNoteButton');
const userNote = document.getElementById('userNote');
const noteOutput = document.getElementById('noteOutput');

const toolMessages = {
    'מחברת דיגיטלית': 'מחברת דיגיטלית טובה כי היא שומרת לך את הרעיונות במקום אחד וניתן לחזור אליהם בקלות.',
    'מפת מושגים': 'מפת מושגים טובה כי היא מארגנת נושאים בקבוצה ועוזרת לראות קשרים בין רעיונות.',
    'פלייליסט לימוד': 'פלייליסט לימוד טוב כי מוזיקה רגועה יכולה לשפר ריכוז בזמן עבודה ארוכה.',
    'כרטיסיות סיכום': 'כרטיסיות סיכום טובות כי הן מסכמות נקודות חשובות בצורה קצרה ונוחה לשינון.'
};

if (toolButtons.length && toolResult) {
    toolButtons.forEach(button => {
        button.addEventListener('click', () => {
            const toolName = button.dataset.tool;
            const message = toolMessages[toolName] || 'כלי זה יכול לעזור לך ללמוד בדרך יעילה יותר.';
            toolResult.textContent = `${toolName}: ${message}`;

            toolButtons.forEach(btn => btn.classList.remove('button-active'));
            button.classList.add('button-active');
        });
    });
}

if (saveNoteButton && userNote && noteOutput) {
    saveNoteButton.addEventListener('click', () => {
        const noteText = userNote.value.trim();
        if (!noteText) {
            noteOutput.textContent = 'אנא כתוב משהו בתיבה לפני השמירה.';
            return;
        }

        noteOutput.textContent = `התזכורת נשמרה: ${noteText}`;
        noteOutput.style.color = '#27ae60';
        userNote.value = '';
    });
}
