const forC = document.querySelector('.fORc'),
weatherSymbol = document.querySelector('.symbol'),
tempContainer = document.querySelector('.temp-container'),
tempElement = document.querySelector('.temp');
let temp = 0;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`, function (json) {
      temp = json.main.temp;
      let textDescrip = json.weather[0].main;
      document.querySelector('.location').innerHTML = `${json.name}, ${json.sys.country}`;
      tempElement.innerHTML = `${json.main.temp}`;
      document.querySelector('.text-descrip').innerHTML = `${json.weather[0].main}`;

      if (textDescrip === 'Clear') {
        weatherSymbol.setAttribute('src', 'weather-icons/animated/day.svg');
      } else if (textDescrip === 'Clouds') {
        weatherSymbol.setAttribute('src', 'weather-icons/animated/cloudy.svg');
      } else if (textDescrip === 'Rain') {
        weatherSymbol.setAttribute('src', 'weather-icons/animated/rainty-6.svg');
      }
    });
  });
} else {
  console.log("Geolocation not supported in this browser");
}


let clickTrack = 0;
forC.addEventListener('click', function () {
  if (clickTrack === 0) {
    tempElement.innerHTML = `${Math.round(temp * 2.25 + 32)}`;
    forC.innerHTML = `&#8457;`;

    tempContainer.classList.add('animate-change');
    setTimeout(function () {
      tempContainer.classList.remove('animate-change');
    }, 500)

    clickTrack = 1;
  } else {
    tempElement.innerHTML = `${temp}`;
    forC.innerHTML = `&#8451;`;

    tempContainer.classList.add('animate-change');
    setTimeout(function () {
      tempContainer.classList.remove('animate-change');
    }, 500)

    clickTrack = 0;
  }
})

// T(°F) = 20°C × 9/5 + 32 = 68 °F