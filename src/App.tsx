import { useEffect, useState } from "react";
import "./App.css";
import ListTile from "./components/ListTile";

interface Poke {
  imageURL: string;
  name: string;
  color: string;
}

interface MinimalPoke {
  name: string;
  url: string;
}

const NUMBER_OF_TILES: number = 3;

function App() {
  const [pokesToRender, setPokesToRender] = useState<Poke[]>([]);

  const getRandomInt = (min: number, max: number): number => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  const getAllPokes = async () => {
    const url: string = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
    const allPokesRes = await fetch(url);
    return (await allPokesRes.json()).results;
  };

  const pickUniquePokes = (numberOfPokes: number, pokesArr: any): MinimalPoke[] => {
    const dupPokes = [...pokesArr];
    const chosenPokes: MinimalPoke[] = [];
    for (let i = 0; i < numberOfPokes; i++) { 
      const pickedNumber: number = getRandomInt(0, numberOfPokes);
      chosenPokes.push(dupPokes[pickedNumber]);
      dupPokes.splice(pickedNumber, 1);
    }

    return chosenPokes;
  }


  const renderList = () => {
    const elementList: any[] = [];
    for (const poke of pokesToRender) {
      elementList.push(<ListTile name={poke.name} iconURL={poke.imageURL} color={poke.color}></ListTile>);
    }

    console.log(elementList);
    return elementList;
  }

  useEffect(() => {
    (async () => {
      const _pokesArr = await getAllPokes();
      let pickedPokes: MinimalPoke[] = [];
      if (_pokesArr)
        pickedPokes = pickUniquePokes(NUMBER_OF_TILES, _pokesArr);

      if (pickedPokes) {
        const pokesToRender = [];
        for (const poke of pickedPokes) {
          const res = await fetch(poke.url)
          const pokeAsJSON = await res.json();
          pokesToRender.push({
            imageURL: pokeAsJSON.sprites.front_default,
            name: poke.name,
            color: 'blue'
          });
        }

        setPokesToRender(pokesToRender);
      }
    })()
  }, []);

  return (
    <>
      <nav>
        <span>Logo</span>
      </nav>
      <center>
        { renderList() }
      </center>
      <footer>footer</footer>
    </>
  );
}

export default App;
