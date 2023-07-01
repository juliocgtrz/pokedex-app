// wrapping the pokemonList in an Immediately Invoked Function Expression (IIFE)
let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Bulbasaur', number: 1, height: 0.7, type: ['grass', 'poison']},
        {name: 'Charmander', number: 4, height: 0.6, type: 'fire'},
        {name: 'Squirtle', number: 7, height: 0.5, type: 'water'},
        {name: 'Caterpie', number: 10, height: 0.3, type: 'bug'},
        {name: 'Weedle', number: 13, height: 0.3, type: ['bug', 'poison']},
        {name: 'Pidgey', number: 16, height: 0.3, type: ['flying', 'normal']},
        {name: 'Rattata', number: 19, height: 0.3, type: 'normal'},
        {name: 'Spearow', number: 21, height: 0.3, type: ['flying', 'normal']},
        {name: 'Ekans', number: 23, height: 2, type: 'poison'},
        {name: 'Pikachu', number: 25, height: 0.4, type: 'electric'}
    ];
  
    function getAll() {
      return pokemonList;
    }
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();
  // this code writes the name of each pokemon in a list with a break in between each pokemon name
  pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name);
    document.write('<br/>');
  });
  