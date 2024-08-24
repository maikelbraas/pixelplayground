if (document.cookie.includes('visitSite=iagree'))
    document.getElementById('disclaimer').style.display = 'none';
else {
    let timerDiscplaimer = 4;
    let interval = setInterval(() => {
        document.getElementById('timer').innerHTML = "You can agree or disagree in: " + timerDiscplaimer;
        timerDiscplaimer--;
    }, 1000);

    setTimeout(() => {
        document.getElementById('timer').style.display = 'none';
        document.getElementById('inner').innerHTML += `
            <div>
                <button id='agree'>I agree, continue to site</button>
                <button id='disagree'>I do not agree, close window</button>
            </div>
            `;
        const agree = document.getElementById('agree');
        const disagree = document.getElementById('disagree');

        agree.addEventListener('click', () => {
            document.cookie = `visitSite=iagree; secure=true; Max-Age=${Date.now() + (20 * 1000)}; sameSite=strict;`
            document.getElementById('disclaimer').style.display = 'none';
        })

        disagree.addEventListener('click', () => {
            window.close();
        })
        clearInterval(interval);
    }, 5000)

}