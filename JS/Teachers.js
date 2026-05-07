document.addEventListener('DOMContentLoaded', () => {
    const permanentBody = document.getElementById('permanent-list');
    const researcherBody = document.getElementById('researcher-list');

    // Path to your JSON file
    fetch('../JSON/Teachers.json')
        .then(response => {
            if (!response.ok) throw new Error("Could not load JSON");
            return response.json();
        })
        .then(data => {
            // Fill Permanent Teachers
            data.permanentTeachers.forEach(t => {
                const row = `<tr>
                    <td>${t.name}</td>
                    <td>${t.expertise}</td>
                    <td><a href="${t.url}">View Studies</a></td>
                </tr>`;
                permanentBody.innerHTML += row;
            });

            // Fill Researcher Teachers
            data.researcherTeachers.forEach(t => {
                const row = `<tr>
                    <td>${t.name}</td>
                    <td>${t.research}</td>
                    <td><a href="${t.url}">View Studies</a></td>
                </tr>`;
                researcherBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching teachers:', error));
});
