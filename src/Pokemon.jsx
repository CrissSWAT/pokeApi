import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Pokemon = () => {
  let { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const { id, types, abilities, stats, sprites } = response.data;
        setPokemon({
          id,
          name,
          types: types.map((typeInfo) => typeInfo.type.name),
          abilities: abilities.map((abilityInfo) => abilityInfo.ability.name),
          stats: stats.map((stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
          imagenUrl: sprites.other.dream_world.front_default,
        });
      } catch (error) {
        console.log("error" + error);
      }
    };

    fetchPokemon();
  }, [name]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {pokemon ? (
        <div>
          <div className="mb-4">
            <h1 className="font-bold text-xl mb-2">Pokémon: {pokemon.name}</h1>
            <img src={pokemon.imagenUrl} alt={pokemon.name} />
            <p>ID: {pokemon.id}</p>
            <p>Types: {pokemon.types.join(", ")}</p>
            <p>Abilities: {pokemon.abilities.join(", ")}</p>
          </div>
          <div>
            <h2 className="font-bold text-lg">Stats:</h2>
            <ul>
              {pokemon.stats.map((stat, index) => (
                <li key={index}>
                  {stat.name}: {stat.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
