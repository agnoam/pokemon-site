import { useEffect, useState } from "react";

import ListTile from "./components/ListTile/ListTile";
import { Utils } from "./utils/utils";
import { default as config } from './config.json';
import "./App.css";

interface Poke {
  imageURL: string;
  name: string;
  color: string;
}

interface MinimalPoke {
  name: string;
  url: string;
}

function App() {
  const [pokesToRender, setPokesToRender] = useState<Poke[]>([]);

  const getAllPokes = async () => {
    const url: string = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
    const allPokesRes = await fetch(url);
    return (await allPokesRes.json()).results;
  };

  const pickUniquePokes = (numberOfPokes: number, pokesArr: any): MinimalPoke[] => {
    const dupPokes = [...pokesArr];
    const chosenPokes: MinimalPoke[] = [];
    for (let i = 0; i < numberOfPokes; i++) { 
      const pickedNumber: number = Utils.getRandomInt(0, pokesArr.length);
      chosenPokes.push(dupPokes[pickedNumber]);
      dupPokes.splice(pickedNumber, 1);
    }

    return chosenPokes;
  }


  const renderList = () => {
    const elementList: any[] = [];
    pokesToRender.forEach((poke, i) => {
      elementList.push(
        <ListTile key={i} name={poke.name} iconURL={poke.imageURL} color={poke.color} />
      );
    });

    return elementList;
  }

  useEffect(() => {
    (async () => {
      const _pokesArr = await getAllPokes();
      let pickedPokes: MinimalPoke[] = [];
      if (_pokesArr)
        pickedPokes = pickUniquePokes(config.NUMBER_OF_TILES, _pokesArr);

      if (pickedPokes) {
        const pokesToRender = [];
        for (const poke of pickedPokes) {
          const res = await fetch(poke.url)
          const pokeAsJSON = await res.json();
          pokesToRender.push({
            imageURL: pokeAsJSON.sprites.front_default,
            name: poke.name,
            color: Utils.randomHexColor()
          });
        }

        setPokesToRender(pokesToRender);
      }
    })()
  }, []);

  return (
    <>
      <nav>
        <img src={config.logoURL} alt="logo" />
        <button className='right-action'>Login</button>
      </nav>
      { renderList() }
      <footer>footer</footer>
    </>
  );
}

export default App;
