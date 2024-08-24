const agree = document.getElementById('agree');
const disagree = document.getElementById('disagree');

if (document.cookie.includes('visitSite=iagree'))
    document.getElementById('disclaimer').style.display = 'none';

agree.addEventListener('click', () => {
    document.cookie = `visitSite=iagree; secure=true; expires=${Date.now() + 60 * 60 * 1000};`
    document.getElementById('disclaimer').style.display = 'none';
})

disagree.addEventListener('click', () => {
    window.close();
})