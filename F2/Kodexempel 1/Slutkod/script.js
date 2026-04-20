/*KODEXEMPEL 1*/

let myChart; // Global variabel för diagrammet
let searchedCountries = []; // Array för att spara alla sökta länder

window.addEventListener('load', ()=> {
  document.getElementById('preloader').classList.add('d-none');

  // Hämta element
  const searchForm = document.querySelector('#search-form');
  const showChartBtn = document.getElementById('showChartBtn');
  const chartContainer = document.getElementById('chartContainer');

  // Sök-event
  searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const searchInput = document.getElementById('search');
    let searchString = searchInput.value;
    let container = document.getElementById('content');
    
    if (searchString.trim() !== "") {
      document.getElementById('preloader').classList.remove('d-none');
      searchCountryAPI(searchString, container);
      
      // Rensa och fokusera sökfältet
      searchInput.value = '';
      searchInput.focus();
    }
  });

  // Knapp-event för diagrammet
  showChartBtn.addEventListener('click', () => {
    chartContainer.classList.toggle('d-none');
    if (!chartContainer.classList.contains('d-none')) {
      const labels = searchedCountries.map(c => c.name.common);
      const populations = searchedCountries.map(c => c.population);
      renderChart(labels, populations);
      
      // Scrolla ner till diagrammet
      chartContainer.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Funktion för att hämta data från API:et */
async function searchCountryAPI(query, content) {
  const preloader = document.getElementById('preloader');
  const showChartBtn = document.getElementById('showChartBtn');
  content.innerHTML = ''; // Rensar tidigare sökresultat från skärmen

  try {
    // Gör ett asynkront anrop till REST Countries API med söksträngen
    let response = await fetch("https://restcountries.com/v3.1/name/" + query);
    
    // Kontrollerar om svaret är ok (status 200-299), annars kastas ett fel
    if (!response.ok) throw new Error("Kunde inte hitta landet");
    
    // Konverterar svaret från API:et till ett läsbart JSON-objekt
    let data = await response.json();
    
    // Loopar igenom alla länder som returnerades från API-anropet
    data.forEach(country => {
      // Sparar landet i vår historik-array om det inte redan har lagts till tidigare
      if (!searchedCountries.some(c => c.cca3 === country.cca3)) {
        searchedCountries.push(country);
      }

      // Skapar en kolumn (Bootstrap grid) för att hålla land-kortet
      let col = document.createElement("div");
      col.className = "col-lg-4 col-md-6 mb-4 d-flex align-items-stretch";

      // Skapar själva Bootstrap-kortet med skugga och utan ram
      let card = document.createElement("div");
      card.className = "card shadow-sm border-0 w-100";

      // Skapar bildelementet för flaggan och ställer in källa och alt-text
      let img = document.createElement("img");
      img.src = country.flags.png;
      img.alt = country.flags.alt || "Flagga för " + country.name.common;
      img.className = "card-img-top";
      img.style.height = "160px";
      img.style.objectFit = "cover"; // Säkerställer att bilden fyller ut ytan snyggt
      card.appendChild(img);

      // Skapar kortets innehållsdel
      let cardBody = document.createElement("div");
      cardBody.className = "card-body";

      // Lägger till landets namn som en rubrik i kortet
      let title = document.createElement("h5");
      title.className = "card-title text-primary font-weight-bold";
      title.textContent = country.name.common;
      cardBody.appendChild(title);

      // Skapar en paragraf för att visa area och population, formaterat med svenska tusentalsavgränsare
      let text = document.createElement("p");
      text.className = "card-text text-muted";
      text.innerHTML = '<i class="text-dark font-weight-bold">Area:</i> ' + country.area.toLocaleString() + ' km²<br>' +
                        '<i class="text-dark font-weight-bold">Population:</i> ' + country.population.toLocaleString();
      cardBody.appendChild(text);

      // Sätter ihop kortets delar och lägger till det i containern på sidan
      card.appendChild(cardBody);
      col.appendChild(card);
      content.appendChild(col);
    });

    // Aktivera knappen om vi har fler än 2 länder
    if (searchedCountries.length > 2) {
      showChartBtn.disabled = false;
      showChartBtn.textContent = 'Compare Populations (' + searchedCountries.length + ' countries)';
    } else {
      showChartBtn.textContent = 'Search ' + (3 - searchedCountries.length) + ' more to compare';
    }

  } catch(error) {
    console.log("FEL: " + error);
    content.innerHTML = '<div class="col-12"><div class="alert alert-danger shadow-sm">Kunde inte hitta "' + query + '". Försök igen!</div></div>';
  } finally {
    preloader.classList.add('d-none');
  }
}

/**
 * Funktion för att rendera diagrammet
 */
function renderChart(labels, populations) {
  const ctx = document.getElementById('populationChart').getContext('2d');
  
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Population',
        data: populations,
        backgroundColor: 'rgba(0, 123, 255, 0.6)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 2,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Population Comparison by Country',
          font: { size: 22, weight: 'bold' },
          padding: 20
        },
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#e9ecef' },
          ticks: {
            callback: value => value.toLocaleString(),
            font: { weight: 'bold' }
          }
        },
        x: {
          grid: { display: false },
          ticks: { font: { weight: 'bold' } }
        }
      }
    }
  });
}
