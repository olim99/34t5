const countriesContainer = document.getElementById('countries-container');
const regionFilter = document.getElementById('region-filter');

let allCountries = [];

async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch data');
        allCountries = await response.json();
        displayCountries(allCountries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function displayCountries(countries) {
    if (!countriesContainer) {
        console.error('Container not found');
        return;
    }

    countriesContainer.innerHTML = '';
    if (countries.length === 0) {
        countriesContainer.innerHTML = '<p>No countries found.</p>';
        return;
    }

    countries.forEach(country => {
        const countryName = country.name?.common || 'Unknown';
        const region = country.region || 'Unknown';
        const flag = country.flags?.svg || '';

        if (flag) { 
            const card = document.createElement('div');
            card.className = 'country-card';
            card.innerHTML = `
                <img src="${flag}" alt="Flag of ${countryName}">
                <h3>${countryName}</h3>
                <p>Region: ${region}</p>
            `;
            card.addEventListener('click', () => {
                window.location.href = `country.html?name=${encodeURIComponent(countryName)}&region=${encodeURIComponent(region)}&flag=${encodeURIComponent(flag)}`;
            });
            countriesContainer.appendChild(card);
        }
    });
}

regionFilter.addEventListener('change', (e) => {
    const selectedRegion = e.target.value;
    const filteredCountries = selectedRegion === 'all' 
        ? allCountries 
        : allCountries.filter(country => country.region?.toLowerCase() === selectedRegion.toLowerCase());
    
    displayCountries(filteredCountries);
});

fetchCountries();
