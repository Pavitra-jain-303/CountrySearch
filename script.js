let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
// let result = document.querySelector(".result");

function formatNumber(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + ' billion';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + ' million';
    }
    return number.toString();
}


searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value.trim();
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    // console.log(finalURL);
    fetch(finalURL).then((res) => res.json())
        .then((data) => {
            console.log(data[0]);
            const Data = data[0];
            // console.log(Data.capital[0]);
            // console.log(Data.altSpellings[1]);
            // console.log(Data.flags.svg);
            // console.log(Data.name.common);
            // console.log(Data.continents[0]);
            // console.log(Object.keys(Data.currencies)[0]);
            // console.log(Data.currencies[Object.keys(Data.currencies)].name);
            // console.log(Data.currencies[Object.keys(Data.currencies)].symbol);
            // console.log(Object.values(Data.languages).toString().split(",").join(", "));
            result.innerHTML = `
                <img src="${Data.flags.svg}" class="flag-img"> 
                <h2>${Data.name.common}</h2>
                <h3 class = "Official-name">${Data.name.official}</h3>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Capital:</h4>
                        <span>${Data.capital[0]}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Continent:</h4>
                        <span>${Data.continents[0]}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Population:</h4>
                        <span>${formatNumber(Data.population)}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Currency:</h4>
                        <span>  ${Data.currencies[Object.keys(Data.currencies)].symbol} (${Object.keys(Data.currencies)[0]}) - ${Data.currencies[Object.keys(Data.currencies)].name}</span>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="data-wrapper">
                        <h4>Common Language:</h4>
                        <span>${Object.values(Data.languages).toString().split(",").join(", ") }</span>
                    </div>
                </div>
            `;
        })
        .catch(()=>{
            if(countryName.length == 0)
            {
                result.innerHTML = `<h3>The input field cannot be empty</h3>`;
            } else {
                result.innerHTML = `<h3> Please enter the valid country Name </h3>`;
            }
        })
});

