
let counterOn = false;
let timerInterval;

let hours = 0;
let min = 0;
let sec = 0;
let hundreth = 0;

let payment = 12;

let euros = 0;
let oldEuros = 0;

function toggleCounter() {
    let timeButton = document.getElementById("timer-button");
    let minDiv = document.getElementById("minutes");
    let secDiv = document.getElementById("seconds");
    let hundrethsDiv = document.getElementById("hundreths");
    let paymentInput = document.getElementById("payment-input");
    let moneyDiv = document.getElementById("money");

    if (!counterOn) {
        payment = paymentInput.value;
        paymentInput.disabled = true;

        timeButton.classList.add("stop");
        counterOn = true;
        timerInterval = setInterval(() => {
            hundreth += 1;

            if (hundreth === 100) {
                sec += 1;
                hundreth = 0;
            }

            if (sec === 60) {
                min += 1;
                sec = 0;
            }

            let minString = min >= 10 ? min : `0${min}`;
            let secString = sec >= 10 ? sec : `0${sec}`;
            let hundrethString = hundreth >= 10 ? hundreth : `0${hundreth}`

            minDiv.innerHTML = minString;
            secDiv.innerHTML = secString;
            hundrethsDiv.innerHTML = hundrethString;

            //Calculate money
            euros += ((payment / 60) / 60) / 100;
            moneyDiv.innerHTML = `${euros.toFixed(2)}&euro;`;

            if (parseInt(euros * 100) + 1 > parseInt(oldEuros * 100) + 1) {
                console.log("new cent");
                oldEuros = euros;
                fallingCent();
            }


        }, 10);
    } else {
        timeButton.classList.remove("stop");
        counterOn = false;
        clearInterval(timerInterval);
    }

}

function resetCounter() {
    let timeButton = document.getElementById("timer-button");
    let minDiv = document.getElementById("minutes");
    let secDiv = document.getElementById("seconds");
    let hundrethsDiv = document.getElementById("hundreths");
    let paymentInput = document.getElementById("payment-input");
    let moneyDiv = document.getElementById("money");

    clearInterval(timerInterval);
    timeButton.classList.remove("stop");
    counterOn = false;
    hours = 0;
    min = 0;
    sec = 0;
    hundreth = 0;
    payment = 12;
    euros = 0;
    oldEuros = 0;
    paymentInput.disabled = false;


    let minString = min >= 10 ? min : `0${min}`;
    let secString = sec >= 10 ? sec : `0${sec}`;
    let hundrethString = hundreth >= 10 ? hundreth : `0${hundreth}`

    minDiv.innerHTML = minString;
    secDiv.innerHTML = secString;
    hundrethsDiv.innerHTML = hundrethString;

    //Calculate money
    euros += ((payment / 60) / 60) / 100;
    moneyDiv.innerHTML = `${euros.toFixed(2)}&euro;`;

}

function fallingCent() {
    let centImage = document.getElementById("cent-image");
    let cln = centImage.cloneNode(true);
    cln.style.opacity = "1";
    cln.style.left = (Math.random(10, 90) * 100) + "%";
    document.getElementById("page-wrapper").appendChild(cln);

    setTimeout(() => {
        cln.parentNode.removeChild(cln);
    }, 1500)
}