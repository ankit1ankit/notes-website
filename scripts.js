// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    // Add click handlers for chapter titles
    document.querySelectorAll('.chapter-title').forEach(title => {
        title.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const content = title.nextElementSibling;
            content.classList.toggle('show');
        });
    });
});

function showChapters(chaptersId, subjectElement) {
    // Get all chapters elements
    const allChapters = document.querySelectorAll('.chapters');
    
    // Get the clicked chapters element
    const targetChapters = document.getElementById(chaptersId);
    
    // If we're clicking a main subject (Science or Arts) that has sub-subjects
    if (chaptersId.includes('-subjects')) {
        // Close all other main subjects
        allChapters.forEach(chapter => {
            if (chapter.id !== chaptersId) {
                if (!chapter.id.includes('-chapters')) {
                    chapter.classList.remove('show');
                }
            }
        });
        // Toggle the clicked main subject
        targetChapters.classList.toggle('show');
    } 
    // If we're clicking a regular subject (Class 9-10) or a sub-subject (Class 11-12)
    else {
        // Check if this is a regular subject in Class 9-10
        const isRegularSubject = chaptersId.match(/class-(9|10)-\w+-chapters/);
        
        if (isRegularSubject) {
            // For regular subjects, close all other chapter lists in the same class
            const currentClass = chaptersId.split('-')[0] + '-' + chaptersId.split('-')[1];
            const siblingChapters = document.querySelectorAll(`[id^="${currentClass}"][id$="-chapters"]`);
            siblingChapters.forEach(chapter => {
                if (chapter.id !== chaptersId) {
                    chapter.classList.remove('show');
                }
            });
            // Toggle the clicked subject's chapters
            targetChapters.classList.toggle('show');
        } else {
            // Handle sub-subjects (Class 11-12)
            const parentSubject = subjectElement.closest('.chapters');
            if (parentSubject) {
                // Close sibling sub-subjects' chapters
                const siblingChapters = parentSubject.querySelectorAll('.sub-chapters');
                siblingChapters.forEach(chapter => {
                    if (chapter.id !== chaptersId) {
                        chapter.classList.remove('show');
                    }
                });
                // Toggle the clicked sub-subject's chapters
                targetChapters.classList.toggle('show');
            }
        }
    }

    if (targetChapters) {
        const chapterContents = targetChapters.querySelectorAll('.chapter-content');
        chapterContents.forEach(content => {
            content.classList.toggle('show');
        });
    }
}

function toggleSubjects(subjectsId) {
    // Close all subjects first
    const allSubjects = document.querySelectorAll('.subjects');
    allSubjects.forEach(subject => subject.classList.remove('show'));

    // Open the selected subjects
    const subjectsDiv = document.getElementById(subjectsId);
    if (subjectsDiv) {
        subjectsDiv.classList.add('show');
    } else {
        console.error('Element not found:', subjectsId);
    }
}

function showPDFs(subjectId) {
    console.log('Show PDFs for:', subjectId);
    // In a real application, you would dynamically load or display the PDFs here
}

// Example: You can add more functionality to dynamically load PDFs based on the subjectId 