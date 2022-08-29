let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  let modalContainer = document.querySelector('#modal-container'); 

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
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    })
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
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = `Height: ${pokemon.height}`;

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



  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () { //call the loadDetails(), Pass as parameter the Pokémon object.
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

//console.log(pokemonRepository.getAll());

//pokemonRepository.getAll().forEach(function (pokemon) {
  //pokemonRepository.addListItem(pokemon);
  //if (pokemon.height>=1.0) {
  //   document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s a tall Pokemon!' + '</p>')
  //  } else {
  //    document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s a short Pokemon!' + '</p>')
  //  }
//});

pokemonRepository.loadList().then(function () { //loads the data
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
