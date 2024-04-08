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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {pokemon ? (
        <div>
          <div className="mb-4  flex flex-col justify-center items-center w-full">
            <div className=" flex flex-grid gap-4 m-4">
              <h1 className="font-bold text-xl mb-2 text-slate-800">
                Pokémon: {pokemon.name}
              </h1>
            </div>
            <img
              src={pokemon.imagenUrl}
              alt={pokemon.name}
              className="w-[250px] h-[250px]"
            />
          </div>
          <div className="flex flex-grid justify-center bg-slate-800 rounded-b-lg gap-x-10 py-5">
            <div className="text-left text-white capitalize py-0">
              <p className="font-bold text-lg"> ID: {pokemon.id}</p>
              <h2 className="font-bold text-lg">Types:</h2>
              <p> {pokemon.types.join(", ")}</p>
              <h2 className="font-bold text-lg">Abilities:</h2>
              <p>{pokemon.abilities.join(", ")}</p>
            </div>
            <div className="text-left text-white capitalize">
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
