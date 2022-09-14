// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
// 🐨 you'll also need to get the fetchPokemon function from ../pokemon:
import {PokemonDataView, fetchPokemon, PokemonInfoFallback} from '../pokemon'
// using already provided util functions 
import { createResource } from '../utils';

// 💰 use it like this: fetchPokemon(pokemonName).then(handleSuccess, handleFailure)

// 🐨 create a variable called "pokemon" (using let)
// let pokePon;
// 💣 delete this now...
// const pokemon = {
//   name: 'TODO',
//   number: 'TODO',
//   attacks: {
//     special: [{name: 'TODO', type: 'TODO', damage: 'TODO'}],
//   },
//   fetchedAt: 'TODO',
// }

// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.
// 🐨 assign a pokemonPromise variable to a call to fetchPokemon('pikachu')

// const pokemonPromise = fetchPokemon('pikachu')
// pokemonPromise.then(value => (pokemon = value))

let pokemonResource = createResource(fetchPokemon('pikachu'));

// 🐨 when the promise resolves, assign the "pokemon" variable to the resolved value
// 💰 For example: somePromise.then(resolvedValue => (someValue = resolvedValue))

function PokemonInfo() {
  // 🐨 if there's no pokemon yet, then throw the pokemonPromise
  // 💰 (no, for real. Like: `throw pokemonPromise`)

  // if (!pokemon) {
  //   throw pokemonPromise;
  // }
  
  const pokemon = pokemonResource.read();

  // if the code gets it this far, then the pokemon variable is defined and
  // rendering can continue!
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

// we use the provided createResource in utils instead of below
// but both work the same
//
// function createResource(promise) {
//   let status = 'pending';
//   let result = promise.then(
//     resolvedValue => {
//       status = 'success';
//       result = resolvedValue
//     },
//     error => {
//       status = 'error';
//       result = error
//     }
//   );
//
//   return {
//     read() {
//       if (status === 'pending') throw result;
//       if (status === 'error') throw result;
//       if (status === 'success') return result;
//     }
//   }
// }

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
        <React.Suspense fallback={<PokemonInfoFallback name="Pikachu" />}>
          <PokemonInfo />
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
