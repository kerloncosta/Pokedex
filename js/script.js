const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchpokemon = async (pokemon) => {

    const APIRespoonse = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    if(APIRespoonse.status == 200){
        const data = await APIRespoonse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data =  await fetchpokemon(pokemon)

    if(data){
        pokemonImage.style.display = 'block';
        if(data.id <= 649){
            pokemonName.innerHTML = data.name;
            pokemonNumber.innerHTML = data.id;
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            input.value = "";
            searchPokemon = data.id;
            }else{
                pokemonName.innerHTML = 'unregistered';
                pokemonNumber.innerHTML = data.id;
                pokemonImage.src = 'https://s3.pokeos.com/forgotten-dex/pokemon/0-missingNo.png';
                input.value = "";
            }
    }else{
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '???';
        pokemonImage.style.display = 'none';
        input.value = "";
    }  
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }     
});

buttonNext.addEventListener('click', () => {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);