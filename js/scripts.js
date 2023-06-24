let pokemonList = [ //data for pokedex
    {name: 'Bulbasaur', number: 1, height: 7, type: ['grass', 'poison']},
    {name: 'Charmander', number: 4, height: 6, type: 'fire'},
    {name: 'Squirtle', number: 7, height: 5, type: 'water'},
    {name: 'Caterpie', number: 10, height: 3, type: 'bug'},
    {name: 'Weedle', number: 13, height: 3, type: ['bug', 'poison']},
    {name: 'Pidgey', number: 16, height: 3, type: ['flying', 'normal']},
    {name: 'Rattata', number: 19, height: 3, type: 'normal'},
    {name: 'Spearow', number: 21, height: 3, type: ['flying', 'normal']},
    {name: 'Ekans', number: 23, height: 2, type: 'poison'},
    {name: 'Pikachu', number: 25, height: 4, type: 'electric'}
];

//this will write out each pokemon's name on the webpage with a space in between
for (let i = 0; i < pokemonList.length; i++){
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
}
