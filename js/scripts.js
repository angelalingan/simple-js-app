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


function printArrayDetails(pokemonlist) {
for (let i=0; i < pokemonList.length; i++){
    if (pokemonList.height>=1.0) {
      document.write('<p>' + pokemonList[i].name + ', height: ' + pokemonList[i].height + ' - Wow, that\'s a tall Pokemon!' + '</p>')
    } else {
      document.write('<p>' + pokemonList[i].name + ', height: ' + pokemonList[i].height + ' - Wow, that\'s a short Pokemon!' + '</p>')
    }
  };
}

printArrayDetails(pokemonList);
