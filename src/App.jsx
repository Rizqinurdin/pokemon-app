import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBarComponent from "./component/NavBarComponent";
import NavBarBottomComponent from "./component/NavBarBottomComponent";
import MyPokemon from "./component/MyPokemon";
import CatchPokemon from "./component/CatchPokemon";
import { PokemonProvider } from './PokemonContext';



function App() {
  return (
    <div>
      <PokemonProvider>
        <NavBarComponent />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/myPokemon" Component={MyPokemon} />
          <Route path="/catch-page" Component={CatchPokemon} />
        </Routes>
        <NavBarBottomComponent />
      </PokemonProvider>
    </div>
  )
}

export default App
