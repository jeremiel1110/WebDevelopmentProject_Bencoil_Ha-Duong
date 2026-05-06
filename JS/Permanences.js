document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELECT ELEMENTS ---
    const dateSelect = document.getElementById('date-select');
    const startSelect = document.getElementById('start-time');
    const endSelect = document.getElementById('end-time');
    const courseSelect = document.getElementById('course-select');
    const form = document.getElementById('permanence-form');
    const calendarGrid = document.getElementById('calendar-grid');
    
    // Modal elements
    const modal = document.getElementById('custom-alert');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.getElementById('close-alert');

    // --- 2. POPULATE DROPDOWNS ---
    for (let i = 0; i < 30; i++) {
        let date = new Date();
        date.setDate(date.getDate() + i);
        let dateString = date.toISOString().split('T')[0];
        let displayString = date.toLocaleDateString();
        dateSelect.innerHTML += `<option value="${dateString}">${displayString}</option>`;
    }

    for (let hour = 8; hour <= 18; hour++) {
        let time = `${hour.toString().padStart(2, '0')}:00`;
        startSelect.innerHTML += `<option value="${time}">${time}</option>`;
        endSelect.innerHTML += `<option value="${time}">${time}</option>`;
    }

    // --- 3. FUNCTIONS ---
    let permanences = [];

    function showNiceAlert(message) {
        if (modal && modalText) {
            modalText.innerText = message;
            modal.classList.remove('hidden');
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    function updateCalendarUI() {
        calendarGrid.innerHTML = '';
        permanences.forEach(item => {
            const div = document.createElement('div');
            div.className = 'permanence-card';
            div.innerHTML = `<strong>${item.course}</strong><br>${item.date}<br>${item.start} - ${item.end}`;
            calendarGrid.appendChild(div);
        });
    }

    // --- 4. FORM SUBMISSION ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const date = dateSelect.value;
        const start = startSelect.value;
        const end = endSelect.value;
        const course = courseSelect.value;

        // Validation: Time
        const startH = parseInt(start.split(':')[0]);
        const endH = parseInt(end.split(':')[0]);

        if (endH <= startH) {
            showNiceAlert("End time must be later than Start time! 🌸");
            return;
        }

        // Validation: Duplicate
        const isDuplicate = permanences.some(p => 
            p.date === date && p.start === start && p.end === end && p.course === course
        );

        if (isDuplicate) {
            showNiceAlert("This exact permanence already exists! 😅");
            return;
        }

        permanences.push({ date, start, end, course });
        updateCalendarUI();
    });
});