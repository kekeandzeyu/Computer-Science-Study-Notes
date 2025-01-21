document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs__nav-link');
    const contents = document.querySelectorAll('.tabs__content > div');

    const tabIdentifierMap = {
        'C++': 'C'
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const identifier = tabIdentifierMap[tab.textContent] || tab.textContent;
            const target = document.querySelector(`#${identifier}`);

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.style.display = 'none');

            tab.classList.add('active');
            target.style.display = 'block';
        });
    });

    if(tabs.length > 0) {
        tabs[0].classList.add('active');
        if(contents.length > 0) {
            contents.forEach(c => c.style.display = 'none');
            contents[0].style.display = 'block';
        }
    }
});