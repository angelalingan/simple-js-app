let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#pokemonModalBody'); 

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
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
    button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); //capitalizes the first letter of Pokemon
    button.classList.add('btn', 'btn-primary', 'button-class');
    listpokemon.appendChild(button);
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-is-clicked', 'false');
    document.querySelector('.pokemon-list').appendChild(listpokemon);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    })
    pokemonList.classList.add(
      'group-list-item',
      'justify-content-center',
    );
  };

  function loadList() { //Add a LoadList() function as a return key that uses fetch to GET the complete list of Pokémon from here: https://pokeapi.co/api/v2/pokemon/
    return fetch(apiUrl).then(function (response) {
      return response.json(); //this returns a promise
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name, // name and detailsUrl set as the keys
          detailsUrl: item.url
        };
        add(pokemon); //Use the add() function to add each Pokémon from the results to the pokemonList/repository variable
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) { // add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('pokemon-modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    //titleElement.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1); //capitalizes the first letter of Pokemon in the modal
    
    let contentElement = document.createElement('p');
    let types = pokemon.types.map((item) => item.type.name).join(", "); contentElement.innerText = `Height: ${pokemon.height}` + `m` + ' ' + `Weight: ${pokemon.weight}` + `kg` + ' ' + `Type: ${types.toUpperCase()}`

    let imgElement = document.createElement('img');
    imgElement.classList.add('img-element');
    imgElement.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imgElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () { //call the loadDetails(), Pass as parameter the Pokémon object.
      const title = document.getElementById('pokemonModalLabel');
        title.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);  
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () { //loads the data
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
