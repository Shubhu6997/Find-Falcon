import { useState } from "react";
import Home from "./components/Home";
import { PlanetVehicleContext } from "./context/PlanetVehicleContext";
import FinalResult from "./components/FinalResult";
import Header from "./components/Header";
import Title from "./components/Title";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [allPlanets, setAllPlanets] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState({
    planet1: "",
    planet2: "",
    planet3: "",
    planet4: ""
  });
  const [vehiclesDetails, setVehiclesDetails] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState({
    vehicle1: "",
    vehicle2: "",
    vehicle3: "",
    vehicle4: "",
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [res, setRes] = useState({});
  const [count, setCount] = useState(0);

  return (
    <PlanetVehicleContext.Provider
    value={{
      allPlanets,
      setAllPlanets,
      selectedPlanets, 
      setSelectedPlanets,
      vehiclesDetails, 
      setVehiclesDetails,
      selectedVehicles, 
      setSelectedVehicles,
      filteredPlanets, 
      setFilteredPlanets,
      res,
      setRes,
      count, 
      setCount
    }}>
    <div className="App">
      <Header/>
      <Title/>
      {Object.keys(res).length == 0 ? 
          <Home/>
        :
          <FinalResult/>
      }
      <Footer/>
    </div>
    </PlanetVehicleContext.Provider>
  );
}

export default App;
