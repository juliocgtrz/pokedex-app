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
      listItem.classList.add('list-group-item', 'row', 'bg-transparent', 'border-0');
      button.innerText = capitalize(pokemon.name);
      button.classList.add('btn', 'btn-primary', 'btn-lg', 'pokemon-button');
      button.setAttribute("data-target", "#modal-container");
      button.setAttribute("data-toggle", "modal");
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      // Event listener for clicks on a specific pokemon which will show that pokemon's details specified in the showDetials function
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }
    // Loads the details for the modal
    function showDetails(pokemon) {
      loadDetails(pokemon);
    }
    // This code is used to fetch data in the respository
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
    //  This code loads the details of the item
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Details to the item
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
    // This code logs the details in the console
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }

    // This code allows for the pokemon names to be capitalized
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // This code displays the modal with pokemon details
    function showModal(pokemon) {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");

      // Clear all existing modal content
      modalTitle.empty();
      modalBody.empty();

      // Add the name of the pokemon in the modal
      let titleElement = $("<h1>" + capitalize(pokemon.name) + "</h1>");
      // Add the iamge of the pokemon in the modal
      let imageElement = $('<img class="modal-img" style="width:50% height:50%">');
      imageElement.attr("src", pokemon.imageUrl);
      // Add the height of the pokemon in the modal
      let heightElement = $("<p>" + "Height: " + pokemon.height + " m" + "</p>");
      // Add the weight of the pokemon in the modal
      let weightElement = $("<p>" + "Weight: " + pokemon.weight + " kg" + "</p>");
      // Add the types of the pokemon in the modal
      let typesElement = $("<p>" + "Type(s): " + pokemon.types.join(', ') + "</p>");

      typesElement.addClass('array-item');

      modalTitle.append(titleElement);
      modalBody.append(imageElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
 
    }
                         
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
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

  // Code to filter list based on entry in search bar
  $(document).ready(function(){
    $("#searchBar").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".pokemon-list li").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

  pokemonRepository.loadList().then(function() {
    // This code writes the name of each pokemon in a list
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

  