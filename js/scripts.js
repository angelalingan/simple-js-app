let pokemonRepository = (function () {
  let repository = [
    { 
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      types: ['grass', 'poison']
    },

    {
      name: 'Butterfree',
      height: 1.1,
      weight: 32,
      types: ['bug', 'flying']
    },

    {
      name: 'Pidgeotto',
      height: 1.1,
      weight: 30,
      types: ['flying', 'normal']
    },

    {
      name: 'Jigglypuff',
      height: 0.5,
      weight: 5.5,
      types: ['fairy', 'normal']
    },
  ]; 


  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(event){
      showDetails(pokemon)
    })
  };

  function showDetails(pokemon) {
    console.log(pokemon.name);
  };

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({ name: 'Pikachu', height: 0.3, weight: 6, types: ['electric'] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  //if (pokemon.height>=1.0) {
  //   document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s a tall Pokemon!' + '</p>')
  //  } else {
  //    document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s a short Pokemon!' + '</p>')
  //  }
});
