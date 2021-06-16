const search = document.querySelector("input");
const suggestion = document.querySelector(".suggestions")
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

search.addEventListener("change", find)
search.addEventListener("keyup", find)

const cities = [];

const prom = fetch(endpoint)
                .then(blob => blob.json())
                .then(data => cities.push(...data));


function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        let regex = new RegExp(wordToMatch, 'gi');
        console.log(place.city.match(regex) || place.state.match(regex));
        return place.city.match(regex) || place.state.match(regex);
    })
}




function find(){
    let searched = findMatches(this.value, cities);
    const dropdowns = searched.map(place => {

        let reg = new RegExp(this.value, 'gi');
        let city = place.city.replace(reg, `<span class="highlight">${this.value}</span>`)
        let state = place.state.replace(reg, `<span class="highlight">${this.value}</span>`)
        return `
            <li>
                <span>${city}, ${state}</span>
            </li>
        `
    }).join('')
    if (this.value==="") suggestion.innerHTML=``;
    else suggestion.innerHTML = dropdowns;
}