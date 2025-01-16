document.addEventListener('DOMContentLoaded', () => {
    const enButton = document.querySelector('.tab-button[data-tab="en"]');
    const zhButton = document.querySelector('.tab-button[data-tab="zh"]');
    const enContent = document.querySelector('.en-content');
    const zhContent = document.querySelector('.zh-content');

    const savedLanguage = localStorage.getItem('lang') || 'en';

    if (savedLanguage === 'zh') {
        enButton.classList.remove('active');
        zhButton.classList.add('active');
        enContent.style.display = 'none';
        zhContent.style.display = 'block';
    } else {
        enButton.classList.add('active');
        zhButton.classList.remove('active');
        enContent.style.display = 'block';
        zhContent.style.display = 'none';
    }

    enButton.addEventListener('click', () => {
        localStorage.setItem('lang', 'en');

        enButton.classList.add('active');
        zhButton.classList.remove('active');
        enContent.style.display = 'block';
        zhContent.style.display = 'none';
    });

    zhButton.addEventListener('click', () => {
        localStorage.setItem('lang', 'zh');

        zhButton.classList.add('active');
        enButton.classList.remove('active');
        enContent.style.display = 'none';
        zhContent.style.display = 'block';
    });
});