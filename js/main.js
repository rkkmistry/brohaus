var deadline = toSeconds(18, 0, 0);
var timeWindow = toSeconds(2, 0, 0);

function getTimeRemaining(endtime) {
  var now = new Date();
  var nowConvert = (now.getHours() * 60 * 60) + (now.getMinutes() * 60) + now.getSeconds();
  var remaining = endtime - nowConvert;

  return {
    'remaining': remaining,
    'remainingHours': toNormal(remaining).remainingHours,
    'remainingMinutes': toNormal(remaining).remainingMinutes,
    'remainingSeconds': toNormal(remaining).remainingSeconds,
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  
  function updateClock(){
    var t = getTimeRemaining(endtime);
    var windowTime = toNormal(timeWindow + t.remaining);
    
    clock.innerHTML = textMaker("Get ready, guys!", "until Brohaus begins", t);
    
    if (t.remaining <= 0 && t.remaining >= -timeWindow) {
      clock.innerHTML = textMaker("Get ready, guys!", "until Brohaus is over", windowTime);
    } else if (t.remaining < -timeWindow) {
      clock.innerHTML = "<div class = 'big-text'>Sorry bud, you missed Brohaus today... </div>" +
                        "<div class = 'small-text'>but remember there's always tomorrow</div>";
    }
  }

  updateClock(); // run function once at first to avoid delay
  var timeinterval = setInterval(updateClock, 1000);
}

//the key for special replace is as follows:
//*h* = hour
//*m* = minute
//*s* = second
function specialReplace(theText, time) {
  var text = theText;
  text = text.replace("*h*", time.remainingHours);
  text = text.replace("*m*", time.remainingMinutes);
  text = text.replace("*s*", time.remainingSeconds);
  return text;
}

function textMaker(bigText, smallText, time) {
  var text = '';
  
  text += `<div class = 'big-text'> ${bigText} </div>`;
  
  text += "<div class = 'small-text'>" +
          "There's only ";
  
  if (time.remainingHours > 1 && time.remainingMinutes != 0) {
    text+= "*h* hours, ";
  } else if (time.remainingHours == 1 && time.remainingMinutes != 0) {
    text+= "*h* hour, ";
  } else if (time.remainingHours > 1) {
    text+= "*h* hours and ";
  } else if (time.remainingHours == 1) {
    text+= "*h* hour and ";
  }
  
  if(time.remainingMinutes > 1) {
    text+= "*m* minutes and ";
  } else if (time.remainingMinutes == 1) {
    text+= "*m* minute and ";
  }
    
   if(time.remainingSeconds != 1) {
    text+= "*s* seconds";
  } else if (time.remainingSeconds == 1) {
    text+= "*s* second";
  }
    
  text += ` ${smallText} </div>`;
  
  return specialReplace(text, time);
}

function toSeconds(hours, minutes, seconds) {
  return (hours * 60 * 60) + (minutes * 60) + seconds;
}

function toNormal(seconds) {
  var use = seconds;
  
  if (use < 0 ) {
    use = -use;
  }
  
  return {
    'remainingHours': Math.floor(use /3600),
    'remainingMinutes': Math.floor((use % 3600) / 60),
    'remainingSeconds': Math.floor((use % 3600) % 60)
  }
}

initializeClock('clockdiv', deadline);