function searchByName() {
    const searchValue = document.getElementById("txtInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!searchValue) {
        resultDiv.innerHTML = "<p class='text-danger'>Please enter a country name.</p>";
        return;
    }

    fetch("https://restcountries.com/v3.1/name/" + searchValue)
        .then(res => {
            if (!res.ok) {
                throw new Error("Country not found");
            }
            return res.json();
        })
        
        .then(data => {
            const country = data[0];

            const currencies = country.currencies
                ? Object.values(country.currencies)
                    .map(c => `${c.name} (${c.symbol})`)
                    .join(", ")
                : "N/A";

            const languages = country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A";
            resultDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">${country.name.common}</h3>
                        <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="250">
                        <br><br><p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Languages:</strong> ${languages}</p>
                        <p><strong>Currencies:</strong> ${currencies}</p>
                        <p><strong>Start of the Week:</strong> ${country.startOfWeek || "N/A"}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class='text-danger'>${error.message}</p>`;
        });
}


