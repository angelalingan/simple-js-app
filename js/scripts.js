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

  return { //returns an object with two keys: add and getAll, which will allow anything outside the IIFE to interact with the pokemonList variable within it
    add: add, //a key value pair that references function add(pokemon) as its value
    getAll: getAll //a key value pair that references function getAll() as its value
  };
})(); //the parenthesis calls the function/self-executing, so pokemonRepository becomes equal to the return value of this function shown above

console.log(pokemonRepository.getAll()); 
pokemonRepository.add({
  name: 'Pikachu',
  height: 0.4,
  weight:6
});
console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height>=1.0) {
      document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s a tall Pokemon!' + '</p>')
    } else {
      document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s a short Pokemon!' + '</p>')
    }
});