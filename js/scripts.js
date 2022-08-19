let pokemonRepository = (function () {
  let pokemonList = [
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
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Pikachu'});
console.log(pokemonRepository.getAll());

pokemonList.getAll().forEach(function(pokemon) {
    if (pokemon.height>=1.0) {
      document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s a tall Pokemon!' + '</p>')
    } else {
      document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s a short Pokemon!' + '</p>')
    }
  });