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
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 60 * 60 * 1000;
        now.setTime(expireTime);
        console.log(now.toUTCString());
        agree.addEventListener('click', () => {
            document.cookie = `visitSite=iagree; secure=true; expires=${now.toUTCString()}; sameSite=strict; max-age=session;`
            document.getElementById('disclaimer').style.display = 'none';
        })

        disagree.addEventListener('click', () => {
            window.close();
        })
        clearInterval(interval);
    }, 5000)

}