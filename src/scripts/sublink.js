'use strict';

document.getElementById('toggle-sublinks').addEventListener('click', function() {
    const sublinks = document.querySelector('.data-structures-and-algorithms-sublink');
    if (sublinks.classList.contains('collapsed')) {
        sublinks.classList.remove('collapsed');
        this.classList.remove('rotated');
    } else {
        sublinks.classList.add('collapsed');
        this.classList.add('rotated');
    }
});