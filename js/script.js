const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');

const fetchpokemon = async (pokemon) => {

    const APIRespoonse = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    const data = await APIRespoonse.json();
    return data;
}

const renderPokemon = async (pokemon) => {

    const data =  await fetchpokemon(pokemon)

    if(data.id <= 649){
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }else{
        pokemonName.innerHTML = 'Sem registros';
        pokemonNumber.innerHTML = '???';
        pokemonImage.src = 'https://s3.pokeos.com/forgotten-dex/pokemon/0-missingNo.png';
    }
}
renderPokemon('1000')