const pokemonList = document.querySelector('#pokemon-list')
const typeButtons = document.querySelectorAll('.btn-header')
let URL = 'https://pokeapi.co/api/v2/pokemon/'

let allPokemon = []

// Carrega todos os Pokémon na ordem correta

async function loadPokemonList() {
    const temp = []

    for (let i = 1; i < 151; i++) {
        const response = await fetch(URL + i)
        const data = await response.json()
        temp.push(data)
    }

    temp.sort((a, b) => a.id - b.id)
    allPokemon = temp

    renderPokemonList
}

// Renderiza uma lsita de Pokémon no INDEX.HTML
function renderPokemonList(list) {
    pokemonList.innerHTML = ''
    list.forEach(showPokemon)
}

// Cria o card do Pokémon
function showPokemon(poke) {
    //Carrega tipos
    let types = poke.types.map(
        type => `<p class="${type.type.name} type">${type.type.name}</p>`
    ).join('')
    // ID formatado com 3 dígitos
    let pokeID = poke.id.toString().padStart(3, "0")
    // Converte altura para M e CM
    let height
    if (poke.height > 9) {
        height = `${(poke.height / 10).toString().replace('.', ',')} m`
    } else {
        height = `${poke.height * 10} cm `
    }
    // Converte peso para KG e G
    let weight
    if (poke.weight > 9) {
        weight = `${(poke.weight / 10).toString().replace(',', ',')} Kg`
    } else {
        weight = `${poke.weight * 100} g`
    }

    const div = document.createElement('div')
    div.classList.add('pokemon')

    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeID}</p>

    <div class="pokemon-image">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>

    <div class="pokemon-info">
        <div class="name-container">
            <p class="pokemon-id">${pokeID}</p>
            <h2 class="pokemon-name">${poke.name}</h2>
        </div>

        <div class="pokemon-types">${types}</div>

        <div class="pokemon-stats">
            <p class="stat">${height}</p>
            <p class="stat">${weight}</p>
        </div>
    </div>
    `

    pokemonList.append(div)
}

// Filtro dos tipos
typeButtons.forEach(
    button => button.addEventListener(
        "click",
        (event) => {
            const buttonID = event.currentTarget.id

            if (buttonID === 'view-all') {
                renderPokemonList(allPokemon)
                return
            }

            const filtered = allPokemon.filter(
                p => p.types.some(
                    t = t.type.name === buttonID
                )
            )

            renderPokemonList(filtered)
        }
    )
)

loadPokemonList()