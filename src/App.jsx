import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/pokemon/${inputValue}`);
  };
  const getPokemons = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
      );
      const pokemonData = response.data.results.map((pokemon) => {
        const urlParts = pokemon.url.split("/");
        const id = urlParts[urlParts.length - 2];
        return { ...pokemon, id };
      });
      setPokemons(pokemonData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPokemons();
  }, []);
  return (
    <main className="flex flex-col min-h-screen justify-center items-center w-full ">
      <div
        className="flex flex-grid gap-4
      m-4"
      >
        <h1 className="text-4xl font-bold text-slate-800">Pokemons API</h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/640px-Pokebola-pokeball-png-0.png"
          alt="pokeball imagen"
          className="w-10"
        />
      </div>
      <form onSubmit={handleSubmit} className="m-5 w-full h-10">
        <input
          type="text"
          name="nombrePokemon"
          id="nombrePokemon"
          placeholder="Pokemon Name"
          value={inputValue}
          onChange={handleChange}
          className="rounded-md w-96 h-10 text-center text-slate-800 border-2 border-slate-800"
        />
      </form>
      <ul className="grid grid-cols-4 gap-10">
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.name}`}>
            <li className="bg-white rounded-lg">
              <div className="px-10">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt={`${pokemon.name} sprite`}
                  className="w-[250px] h-[250px]"
                />
              </div>
              <div className="bg-slate-800 rounded-b-lg py-2">
                <p className="text-white capitalize">{pokemon.name}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
};
