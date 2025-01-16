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

document.addEventListener('DOMContentLoaded', () => {
    const enButton = document.querySelector('.tab-button[data-tab="en"]');
    const zhButton = document.querySelector('.tab-button[data-tab="zh"]');
    const enContent = document.querySelector('.en-content');
    const zhContent = document.querySelector('.zh-content');

    if (enButton && zhButton && enContent && zhContent) {
        enButton.addEventListener('click', () => {
            enButton.classList.add('active');
            zhButton.classList.remove('active');
            enContent.style.display = 'block';
            zhContent.style.display = 'none';
        });

        zhButton.addEventListener('click', () => {
            zhButton.classList.add('active');
            enButton.classList.remove('active');
            enContent.style.display = 'none';
            zhContent.style.display = 'block';
        });
    }
});