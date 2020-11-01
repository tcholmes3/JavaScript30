document.addEventListener("DOMContentLoaded", function() {
    const endpoint =
        "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

    const cities = [];
    const search = document.querySelector(".search");
    const suggestions = document.querySelector(".suggestions");

    search.addEventListener("keyup", displayMatches);

    fetch(endpoint)
        .then((raw) => raw.json())
        .then((data) => cities.push(...data));

    function findMatches(string, arr) {
        return arr.filter((x) => {
            // find matches searched
            const regex = new RegExp(string, "gi");
            return x.city.match(regex) || x.state.match(regex);
        });
    }

    function displayMatches() {
        const matchArr = findMatches(this.value, cities);
        const html = matchArr
            .map((x) => {
                const regex = new RegExp(this.value, "gi");
                const cityName = x.city.replace(
                    regex,
                    `<span class = hl>${this.value}</span>`
                );
                const stateName = x.state.replace(
                    regex,
                    `<span class = hl>${this.value}</span>`
                );
                return `<li>
      <span class = "name">${cityName}, ${stateName}</span>
      <span class = "population">${numbersComma(x.population)}</span>
      </li>`;
            })
            .join("");
        suggestions.innerHTML = html;
    }

    function numbersComma(x) {
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        return x.toString().replace(regex, ",");
    }
});