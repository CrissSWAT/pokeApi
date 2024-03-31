import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
export const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const getPokemons = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
      );
      setPokemons(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPokemons();
  }, []);
  return (
    <>
      <h1>Pokemons Api</h1>
      {pokemons.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
      ))}
    </>
  );
};
