if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('pre').forEach(pre => {
            pre.classList.add('collapsed');

            const copyBtn = document.createElement('button');
            const copyIcon = document.createElement('img');
            const collapsibleBtn = document.createElement('button');
            const expandIcon = document.createElement('img');

            copyBtn.className = 'copy-button';
            copyIcon.src = '/assets/notes-icons/copy.svg'; 
            copyIcon.alt = 'Copy code'; 
            copyBtn.appendChild(copyIcon);
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(pre.innerText);
                copyBtn.innerHTML = 'Copied!'; 
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.innerHTML = ''; 
                    copyBtn.appendChild(copyIcon); 
                    copyBtn.classList.remove('copied');
                }, 1000);
            });
            pre.appendChild(copyBtn);

            collapsibleBtn.className = 'collapsible-button';
            expandIcon.src = '/assets/notes-icons/down.png'; 
            expandIcon.classList.add('collapsed-icon'); 
            collapsibleBtn.appendChild(expandIcon);
            collapsibleBtn.addEventListener('click', () => {
                pre.classList.toggle('collapsed');
                expandIcon.classList.toggle('collapsed-icon');
            });
            pre.appendChild(collapsibleBtn);
        });
    });
}