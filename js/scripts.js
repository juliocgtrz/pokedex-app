// wrapping the pokemonList in an Immediately Invoked Function Expression (IIFE)
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function getAll() {
      return pokemonList;
    }
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      //Event listener for clicks on a specific pokemon which will show that pokemon's details specified in the showDetials function
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }
    //Loads the details for the modal
    function showDetails(pokemon) {
      loadDetails(pokemon);
    }
    // this code is used to fetch data in the respository
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
    //  this code loads the details of the item
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        if (details.types.length === 2) {
          item.types[0] = details.types[0].type.name;
          item.types[1] = details.types[1].type.name;
        }else{
          item.types[0] = details.types[0].type.name;
        }
        showModal(item);
      }).catch(function (e) {
        console.error(e);
      });
    }
    // this code logs the details in the console
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }

    // This code displays the modal with pokemon details
    function showModal(pokemon) {
      let modalContainer = document.querySelector('#modal-container');


      // Clear all existing modal content
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let imageElement = document.createElement('img');
      imageElement.classList.add('modal-img');
      imageElement.src = pokemon.imageUrl;

      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height: ' + pokemon.height + ' m';

      // let weightElement = document.createElement('p');
      // contentElement.innerText = 'Weight: ' + pokemon.weight + ' kg';

      let typesElement = document.createElement('p');
      if (pokemon.types.length === 2) {
        typesElement.innerText = 'Type(s): ' + pokemon.types[0] + ', ' + pokemon.types[1];
      }else{
        typesElement.innerText = 'Type(s): ' + pokemon.types;
      }

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(contentElement);
      // modal.appendChild(weightElement);
      modal.appendChild(typesElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');

      modalContainer.addEventListener('click', (e) => {
        //Since this is triggered when clicking inside the modal
        //we only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
      
    }
                         
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');

      // Code to make the close button interactive
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'close';
      closeButtonElement.addEventListener('click', hideModal);

      // Declaring the modal is visible so you can close with the Esc key
      window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
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

  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    // this code writes the name of each pokemon in a list
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

  