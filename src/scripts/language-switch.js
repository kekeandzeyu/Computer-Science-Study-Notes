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