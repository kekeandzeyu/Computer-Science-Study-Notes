document.addEventListener('DOMContentLoaded', () => { 
    const sections = document.querySelectorAll('.title-introduction, .introduction, .notes-container, .author, .summary');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
           });
    }, {
          threshold: 0.5, 
    });

    sections.forEach(section => {
        observer.observe(section);
    })
});