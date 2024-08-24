const agree = document.getElementById('agree');
const disagree = document.getElementById('disagree');

agree.addEventListener('click', () => {
    document.getElementById('disclaimer').style.display = 'none';
})

disagree.addEventListener('click', () => {
    window.close();
})