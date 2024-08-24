<div id='disclaimer'>
    <div id="inner">
    <h1>DO NOT FILL IN REAL DATA</h1>
    <b>This site is not secure, it is an example website for first year programming students.</b>
    <b>Encryption hasn't been thought at this stage.</b>
    <b>If you create an account be aware of this. All password are visible.</b>
    <h2>You're be reminded every hour after accepting!</h2>
    <p id="timer">You can agree or disagree in: 5</p>
    <script>
        let i = 4;
        let interval = setInterval(() => {
            document.getElementById('timer').innerHTML = "You can agree or disagree in: " + i;
            i--;
        }, 1000);
        setTimeout(() => {
        document.getElementById('timer').style.display = 'none';
        document.getElementById('inner').innerHTML += `
        <div>
            <button id='agree'>I agree, continue to site</button>
            <button id='disagree'>I do not agree, close window</button>
        </div>
        `;
        clearInterval(interval);
        }, 5000)
    </script>
    </div>
</div>