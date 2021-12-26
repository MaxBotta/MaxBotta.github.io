
let counterOn = false;
let timerInterval;

let hours = 0;
let min = 0;
let sec = 0;
let hundreth = 0;

let payment = 12;

let euros = 0;
let oldEuros = 0;

document.addEventListener('visibilitychange', function () {
    console.log("visibility change")
    console.log(document.hidden); // whether or not the tab is visible

    //save state
    if (document.hidden) {

    }
});

function toggleCounter() {
    let playButton = document.getElementById("play-button");
    let minDiv = document.getElementById("minutes");
    let secDiv = document.getElementById("seconds");
    let hundrethsDiv = document.getElementById("hundreths");
    let paymentInput = document.getElementById("payment-input");
    let moneyDiv = document.getElementById("money");

    let clockContainer = document.getElementById("clock-container");
    let clockSeconds = document.getElementById("clock-seconds");
    let clockMinutes = document.getElementById("clock-minutes");

    let playIcon = document.getElementById("play-icon");
    let pauseIcon = document.getElementById("pause-icon");

    let oldSec = -1;

    if (!counterOn) {
        payment = paymentInput.value;
        paymentInput.disabled = true;

        playIcon.style.opacity = "0";
        pauseIcon.style.opacity = "1";

        playButton.classList.add("stop");
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
            if (min === 60) {
                hours += 1;
                min = 0;
            }

            let minString = min >= 10 ? min : `0${min}`;
            let secString = sec >= 10 ? sec : `0${sec}`;
            let hundrethString = hundreth >= 10 ? hundreth : `0${hundreth}`

            minDiv.innerHTML = minString;
            secDiv.innerHTML = secString;
            hundrethsDiv.innerHTML = hundrethString;

            //Calculate money
            euros += ((payment / 60) / 60) / 100;
            moneyDiv.innerHTML = `${euros.toFixed(2)}/&euro;`;

            // if (parseInt(euros * 100) + 1 > parseInt(oldEuros * 100) + 1) {
            //     console.log("new cent");
            //     oldEuros = euros;
            //     fallingCent();
            // }


            // //Remove clock elements except last one after one minute
            // if(sec === 0 && oldSec === 59) {
            //     let c = clockContainer.getElementsByClassName("clock clock-seconds");
            //     console.log(c);
            //     for(let e of c) {
            //         e.innerHTML = "";
            //         e.remove();
            //     }
            //     oldSec = 0;
            // }
            // //Animate Clock
            // if(sec > oldSec) {
            //     let newClockSeconds = clockSeconds.cloneNode(true);
            //     clockContainer.insertBefore(newClockSeconds, clockContainer.children[1]);
            //     newClockSeconds.style.transform = `translate(-50%, -50%) rotate(${sec * 6}deg)`;
            //     newClockSeconds.style.background = "none";
            //     oldSec = sec;
            // }

            clockSeconds.style.transform = `translate(-50%, -50%) rotate(${hundreth * 0.06 + sec * 6}deg)`;
            clockMinutes.style.transform = `translate(-50%, -50%) rotate(${sec * 0.1 + min * 6}deg)`;
            // clockHours.style.transform = `translate(-50%, -50%) rotate(${ min * 0.1 + sec * 6}deg)`;

        }, 10);
    } else {
        playIcon.style.opacity = "1";
        pauseIcon.style.opacity = "0";
        playButton.classList.remove("stop");
        counterOn = false;
        clearInterval(timerInterval);
    }

}

function resetCounter() {
    let playIcon = document.getElementById("play-icon");
    let pauseIcon = document.getElementById("pause-icon");
    playIcon.style.opacity = "1";
    pauseIcon.style.opacity = "0";
    let timeButton = document.getElementById("play-button");
    let minDiv = document.getElementById("minutes");
    let secDiv = document.getElementById("seconds");
    let hundrethsDiv = document.getElementById("hundreths");
    let paymentInput = document.getElementById("payment-input");
    let moneyDiv = document.getElementById("money");

    let clockSeconds = document.getElementById("clock-seconds");
    let clockMinutes = document.getElementById("clock-minutes");

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


    clockSeconds.style.transform = `translate(-50%, -50%) rotate(${hundreth * 0.06 + sec * 6}deg)`;
    clockMinutes.style.transform = `translate(-50%, -50%) rotate(${sec * 0.1 + min * 6}deg)`;

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

function togglePaymentButton() {
    let b = document.getElementById("payment-button");
    let ps = document.getElementById("payment-slider");
    console.log(b.clientWidth);
    if (b.clientWidth > 100) {
        ps.classList.remove("active");
        ps.style.visibility = "hidden";

    } else {
        ps.classList.add("active");
        ps.style.visibility = "visible";
    }

    // setTimeout(() => {
    //     b.classList.remove("active");
    //     ps.style.visibility = "hidden";
    // }, 2000);

}