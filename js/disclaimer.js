addEventListener('DOMContentLoaded', () => {
    if (document.cookie.includes('visitSite=iagree')) {
        document.getElementById('disclaimer').style.display = 'none';
    } else {
        //Make it possible to close the window.
        if (!document.cookie.includes('visit=true')) {
            document.cookie = 'visit=true; sameSite=strict;';
        }
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
                <button id='disagree'>I do not agree, take me away</button>
            </div>
            `;
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 60 * 60 * 1000;
            now.setTime(expireTime);
            console.log(now.toUTCString());
            agree.addEventListener('click', () => {
                document.cookie = `visitSite=iagree; secure=true; expires=${now.toUTCString()}; sameSite=strict;`
                document.getElementById('disclaimer').style.display = 'none';
            })

            disagree.addEventListener('click', () => {
                window.location.href = 'about:blank';
            })
            clearInterval(interval);
        }, 5000)
    }
    window.onbeforeunload = () => { document.cookie = 'visit=false;sameSite=strict;Max-Age=0;' }
})