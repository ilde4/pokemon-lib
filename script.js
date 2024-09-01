const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokeImg = document.getElementById("pokemon-img");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

let pokemonArr = [];
let pokeStatsArr = [];


fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
    .then((res) => res.json())
    .then(data => {
        pokemonArr = data.results;
    })
    .catch((err) => {
        console.log(err)
    });

const isPokemon = (input) => {
    if (typeof input === "string") {
        input = input.toLowerCase();
    }
    for (const pokemon of pokemonArr) {
        if (input === pokemon.id || input === pokemon.name) {
            return true;
        }
    }
    return false;
}

const fetchData = async (pokemon) => {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
    const data = await res.json();
    pokeStatsArr = data.stats;
    console.log(data);
};

const getPokemon = (input) => {
    pokemonArr.forEach((el) => {
        if (input === el.id || input === el.name) {
            console.log(el.url);
            hp.innerHTML = el.name.toUpperCase();
            attack.innerHTML = el.id;
        }
    })
    fetchData(input)
};



searchBtn.addEventListener("click", () => {
    if (isPokemon(searchInput.value)) {
        getPokemon(searchInput.value)
    }
});
