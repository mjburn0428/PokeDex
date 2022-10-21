angular.module('pokedex')
  .service('speciesService', function ($http) {
//This pulls the different species types of Pokemon from the pokeapi website//
    this.getPokemon = function (searchTerm) {
      if (isNaN(searchTerm)) {
        searchTerm = searchTerm.toLowerCase();
      }
        return $http({
          method: 'GET',
          url: 'https://pokeapi.co/api/v2/pokemon-species/' + searchTerm + '/'
        }).then(function (response) {
          var pokemon = response.data;
          var pokeData = [];
          var types = [];
          if (searchTerm === 'joe') {
            pokeData.push('1');
            pokeData.push('1');
            pokeData.push('1');
            pokeData.push('1');
            pokeData.push('1');
            pokeData.push('Joe Burner is the master Pokemon Trainer!');
          } else {
            if (pokemon.habitat) {
              pokeData.push(pokemon.habitat.name);
            } else {
              pokeData.push("unknown");
            } if (pokemon.shape) {
              pokeData.push(pokemon.shape.name);
            } else {
              pokeData.push("unknown");
            } if (pokemon.growth_rate) {
              pokeData.push(pokemon.growth_rate.name);
            } else {
              pokeData.push("unknown");
            }
            pokeData.push(pokemon.evolution_chain.url);
            pokeData.push(pokemon.id);
            if (pokemon.flavor_text_entries[1].language.name === 'en') {
              pokeData.push(pokemon.flavor_text_entries[1].flavor_text);
            } else if (pokemon.flavor_text_entries[2].language.name === 'en') {
              pokeData.push(pokemon.flavor_text_entries[2].flavor_text);
            }
        }
          return pokeData;
        }, function () {
          if (searchTerm === 'oak') {
            return [0, 0, 0, 0, 0, "Professor Oak knows all. He is the master of all things pokemon. He welcomes you to his domain and hopes you enjoy your stay"];
          }
          if (searchTerm === 'chris') {
            return [0, 0, 0, 0, 0, "The muscley man, the unheard of myth, the legend! Chris has soared to the top of his peers with his stellar looks and charm. "];
          }
          if (searchTerm === 'hannah') {
            return [0, 0, 0, 0, 0, "Hannah is the queen of knowledge. With her wits she wins your heart. With her fiery passion and divine kindness, she performs miracles. "];
          }
          if (searchTerm === 'ash') {
            return [0, 0, 0, 0, 0, "Ash Ketchum is the OG Pokemon trainer. He has obtained a majority of trainer badges."];
          }
          else {
            return "";
          }
        });
    };

    this.getEvolution = function(input) {
      return $http({
        method: 'GET',
        url: input
      }).then(function(result) {
        var evoChain = [];
        evoChain.push(result.data.chain.species.name);
        if (result.data.chain.evolves_to.length !== 0) {
          evoChain.push('⇒');
          evoChain.push(result.data.chain.evolves_to[0].species.name);
        }
        else {
          return evoChain;
        }
        if (result.data.chain.evolves_to[0].evolves_to.length !== 0) {
          evoChain.push('⇒');
          evoChain.push(result.data.chain.evolves_to[0].evolves_to[0].species.name);
        }
        else {
          return evoChain;
        }
        return evoChain;
      });
    };

  });//End Service
