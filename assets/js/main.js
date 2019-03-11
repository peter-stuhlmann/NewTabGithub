let interval = 1000;

setInterval(function () {
    let currentTime = moment().format('LTS')
    document.querySelector("#currentTime").innerHTML = currentTime
}, interval);
