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

const statList = {
    "normal": "rgb(221, 187, 95)",
    "fighting": "rgb(145, 0, 0)",
    "flying":"rgb(214, 193, 0)",
    "poison":"rgb(54, 0, 153)",
    "ground":"rgb(99, 53, 0)",
    "rock":"rgb(54, 46, 37)",
    "bug":"rgb(6, 71, 0)",
    "ghost":"rgb(115, 101, 245)",
    "steel":"rgb(187, 187, 187)",
    "fire":"rgb(255, 153, 19)",
    "water":"rgb(37, 175, 255)",
    "grass":"rgb(0, 170, 0)",
    "electric":"rgb(255, 255, 0)",
    "psychic":"rgb(111, 0, 255)",
    "ice":"rgb(0, 247, 255)",
    "dragon":"rgb(110, 0, 0)",
    "dark":"rgb(31, 31, 31)",
    "fairy":"rgb(248, 155, 233)",
    "stellar":"rgb(217, 255, 78)",
    "unknown":"rgb(0, 0, 0)"
};

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
    };
    for (const pokemon of pokemonArr) {
        if (input === pokemon.id || input === pokemon.name) {
            return true;
        };
    };
    return false;
};

const getPokemonStats = async (pokemon) => {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`);
    const data = await res.json();
    const image = data.sprites.front_default;
    const typeArr = data.types;
    weight.innerHTML = `Weight: ${data.weight}`;
    height.innerHTML = `Height: ${data.height}`;
    pokeImg.innerHTML = `<img src="${image}" id="sprite" alt="${pokeName.textContent}">`;
    types.innerHTML = "";
    typeArr.forEach((el) => {
        types.innerHTML += `<span id="type${el.slot}" class="type ${el.type.name}">${el.type.name.toUpperCase()}</span>`;
        const typeStat = document.getElementById(`type${el.slot}`);
        typeStat.style.backgroundColor = statList[el.type.name];
        if (el.type.name === "dark" || el.type.name === "unknown" || el.type.name === "poison" || el.type.name === "bug") {
            typeStat.style.color = "white";
        };
    });

    pokeStatsArr = data.stats;

    pokeStatsArr.forEach((stat, index) => {
        statsList[index].innerHTML = pokeStatsArr[index].base_stat;
    });
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
        input = parseInt(input);
    };
    if (isPokemon(input)) {
        getPokemon(input);
        getPokemonStats(input);
    } else {
        alert("Pokémon not found");
    };
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        let input = searchInput.value.toLowerCase();
        if (!isNaN(searchInput.value)) {
        input = parseInt(input)
        };
        if (isPokemon(input)) {
            getPokemon(input);
            getPokemonStats(input);
        } else {
            alert("Pokémon not found")
        };
    };
});