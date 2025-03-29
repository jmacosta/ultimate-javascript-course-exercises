'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
             <img class="country__img" src="${data.flag}" />
             <div class="country__data">
               <h3 class="country__name">${data.name}</h3>
               <h4 class="country__region">${data.region}</h4>
               <p class="country__row"><span>👫</span> ${(
                 +data.population / 1000000
               ).toFixed(1)}M people</p>
               <p class="country__row"><span>🗣️</span> ${
                 data.languages[0].name
               }</p>
               <p class="country__row"><span>💰</span> ${
                 data.currencies[0].name
               }</p>
             </div>
           </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   //AJAX cal country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     //render country 1
//     renderCountry(data);
//     // get Neighbour country (2)
//     const neighbour = data.borders?.[0];
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`).then(function (
//     response
//   ) {
//     console.log(response);
//     return response.json().then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
//   });
// };
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      //country 2
      return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(` ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  whereAmI(-33.933, 18.474);
});

// const whereAmI = function (lat, lng) {
//   fetch(
//     ` https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('something was wrong');
//       }
//       return response.json();
//     })
//     .then(data => {
//       getCountryData(data.countryName);
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//     })
//     .catch(function (err) {
//       console.log(`An error ${err.message}`);
//     });
// };

// console.log('¡Test start');
// setTimeout(() => console.log('0 sec timer!'), 0);
// Promise.resolve('Resolve promise 1').then(res => console.log(res));
// Promise.resolve('Resolve promise 2').then(res => {
//   for (let i = 0; i < 1000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 🤑💰');
//     } else {
//       reject('You lost your money 💩');
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifing setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// wait(1)
//   .then(() => {
//     console.log('I waited for 1 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 3 seconds');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 4 seconds');
//   });

// // Promise.resolve('ABC').then(x => console.log(x));
// // Promise.reject('ABC').then(x => console.error(x));

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// console.log('Getting position');

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// const whereAmI = function (lat, lng) {
//   fetch(
//     ` https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('something was wrong');
//       }
//       return response.json();
//     })
//     .then(data => {
//       getCountryData(data.countryName);
//       console.log(`You are in ${data.city}, ${data.countryName}`);
//     })
//     .catch(function (err) {
//       console.log(`An error ${err.message}`);
//     });
// };

// getPosition().then(pos => whereAmI(pos.coords.latitude, pos.coords.longitude));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = async function (country) {
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  const resGeo = await fetch(
    ` https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  );
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.countryName}`
  );
  console.log(res);
  const data = await res.json();
  renderCountry(data[0]);
  console.log(data[0]);
};

whereAmI();
console.log('First');
