document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('home-permanences-container');

    const permanences =
        JSON.parse(sessionStorage.getItem('permanences')) || [];

    if (permanences.length === 0) {

        container.innerHTML = `
            <p>No upcoming permanences.</p>
        `;

        return;
    }

    permanences.forEach(item => {

        const card = document.createElement('div');

        card.className = 'home-permanence-card';

        card.innerHTML = `
            <strong>${item.course}</strong><br><br>

            Date: ${item.date}<br>

            ${item.start} - ${item.end}
        `;

        container.appendChild(card);
    });

});