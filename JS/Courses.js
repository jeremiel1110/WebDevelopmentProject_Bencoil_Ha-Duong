document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');

    fetch('../JSON/Courses.json')
        .then(res => res.json())
        .then(data => {
            data.courses.forEach(course => {
                // Create the visible row
                const row = document.createElement('tr');
                row.className = 'course-row';
                row.innerHTML = `
                    <td><strong>${course.id}</strong></td>
                    <td>${course.name}</td>
                    <td>${course.teacher}</td>
                    <td><span class="ects-badge">${course.ects}</span></td>
                `;

                // Create the hidden detail row
                const detailRow = document.createElement('tr');
                detailRow.className = 'detail-row';
                const syllabusItems = course.syllabus.map(item => `<li>${item}</li>`).join('');
                
                detailRow.innerHTML = `
                    <td colspan="4">
                        <div class="detail-content">
                            <h4>Description</h4>
                            <p>${course.description}</p>
                            <h4>Syllabus</h4>
                            <ul class="syllabus-list">${syllabusItems}</ul>
                        </div>
                    </td>
                `;

                // Toggle logic
                row.addEventListener('click', () => {
                    const isActive = detailRow.classList.contains('active');
                    // Close all other rows first (optional)
                    document.querySelectorAll('.detail-row').forEach(r => r.classList.remove('active'));
                    // Toggle current row
                    if (!isActive) detailRow.classList.add('active');
                });

                courseList.appendChild(row);
                courseList.appendChild(detailRow);
            });
        });
});