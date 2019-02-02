$(document).ready(function () {
    factorclock();
    setInterval(factorclock, 1000);
    $('*').bind("click",factorclock);
    $('#secondsCheck').bind("click", toggleSeconds);
    $('#24HourCheck').bind("click", toggle24H);


});


var do24H = false;
var doSeconds = false;
var time;
var color = '#ff0000';

function toggleSeconds() {
    if (!doSeconds){
        document.getElementById("secondsCheck").setAttribute("class", "selected");
    } else {
        document.getElementById("secondsCheck").setAttribute("class", "");
    }
    doSeconds = !doSeconds;
}

function toggle24H() {
    if (!do24H){
        document.getElementById("24HourCheck").setAttribute("class", "selected");
    } else {
        document.getElementById("24HourCheck").setAttribute("class", "");
    }
    do24H = !do24H;
}

function factorclock(){
    time = new Date().toLocaleTimeString().replace("/.*(\d{2}:\d{2}:\d{2}).*/", "$1");
    if (do24H) {
        if (((time.substring(time.length-2, time.length) == 'PM') && (time.substring(0, 2) != '12')) || ((time.substring(0, 2) == '12') && (time.substring(time.length-2, time.length) == 'AM'))) {
            timearray = time.split(':')
            timearray[0] = parseInt(timearray[0])+12;
            if (timearray[0] == 24) {timearray[0] = 0;}
            time = timearray[0] + ":" + timearray[1] + ":" + timearray[2];
        }
    }
    time = time.replace(" AM","");
    time = time.replace(" PM","");
    if (!doSeconds) {
        time = time.substring(0, time.length-3);
    }
    document.getElementById("time").innerHTML = time;
    var numbertime = time.replace(":","");
    numbertime = numbertime.replace(":","");
    factorlist = getAllFactorsFor(numbertime).join(' <span class="tinyx"> x </span>');
    document.getElementById("factors").innerHTML = factorlist;

}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getAllFactorsFor(remainder) {
    var factors = [], i;

    for (i = 2; i <= remainder; i++) {
        while ((remainder % i) === 0) {
            factors.push(i);
            remainder /= i;
        }
    }

    return factors;
}
