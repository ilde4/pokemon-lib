const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokeImg = document.getElementById("pokemon-image");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

let pokemonArr = [];
let pokeStatsArr = [];

const statsList = [
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed
];


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

const getPokemonStats = async (pokemon) => {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
    const data = await res.json();
    const image = data.sprites.front_default;
    const typeArr = data.types;
    weight.innerHTML = `Weight: ${data.weight}`;
    height.innerHTML = `Height: ${data.height}`;
    pokeImg.innerHTML = `<img src="${image}" id="sprite" alt="${pokeName.textContent}">`;
    types.innerHTML = ""
    typeArr.forEach((el) => {
        types.innerHTML += `<span class="type${el.slot} ${el.type.name}">${el.type.name.toUpperCase()}</span>`
    });

    pokeStatsArr = data.stats;

    pokeStatsArr.forEach((stat, index) => {
        statsList[index].innerHTML = pokeStatsArr[index].base_stat
    })

    console.log(pokeStatsArr)
};

const getPokemon = (input) => {
    pokemonArr.forEach((el) => {
        if (input === el.id || input === el.name) {
            pokeName.innerHTML = el.name.toUpperCase();
            pokeId.innerHTML = `#${el.id}`;
        };
    });
};



searchBtn.addEventListener("click", () => {
    let input = searchInput.value.toLowerCase();
    if (!isNaN(searchInput.value)) {
        input = parseInt(input)
    }
    if (isPokemon(input)) {
        getPokemon(input);
        getPokemonStats(input);
    } else {
        alert("Pokémon not found")
    }
});
