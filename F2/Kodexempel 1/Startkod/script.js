/*KODEXEMPEL 1*/

/**
 * JSDoc kommentar:
 * Makes a request to https://restcountries.com/v3.1/name/{query} and displays a the results.
 * @param {string} query The user’s searchCountryAPI query
 * @param {HTMLElement} container The <tbody> element that the result will be printed to
 */

window.addEventListener('load', ()=> {
  document.getElementById('preloader').classList.add('d-none');

  document.querySelector('#search-form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    /*Hämtar ut det vi har sökt på i sökbaren*/
    let searchString = document.getElementById('search').value;
    /*Hämtar ut div-containern från HTML*/
    let container = document.getElementById('content');
    document.getElementById('preloader').classList.remove('d-none');
    
  });
});

/* Här nedan ska vi skapa funktionen för att hämta data från API:et */


