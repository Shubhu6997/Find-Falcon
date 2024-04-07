import { useContext, useEffect, useState } from "react"
import PlanetAutocomplete from "./PlanetAutocomplete"
import { homeStyles } from "./styles.js/home"
import { PlanetVehicleContext } from "../context/PlanetVehicleContext"
import Time from "./Time"

const Home = () => {
    const {
        allPlanets,
        setAllPlanets,
        selectedPlanets, 
        setVehiclesDetails,
        selectedVehicles,
        setFilteredPlanets,
        setRes
    } = useContext(PlanetVehicleContext);

    const [token, setToken] = useState("");
 
    const getPlanets = () => {
        const planetsAPI = process.env.REACT_APP_PLANETS_API_URL;
        try{
            fetch(planetsAPI)
            .then(response => response.json())
            .then(data => setAllPlanets(data))
        }catch(error){
            console.log("error: ", error);
        } 
    }

    const getVehicles = () => {
        const vehiclesAPI = process.env.REACT_APP_VEHICLES_API_URL;
        try{
            fetch(vehiclesAPI)
            .then(response => response.json())
            .then(data => setVehiclesDetails(data))
        }catch(error){
            console.log("error: ", error);
        } 
    }

    const getToken = () => {
        const tokenAPI = process.env.REACT_APP_TOKEN_API_URL;
        try {
            fetch(tokenAPI,{
                method: "POST",
                headers: {
                    "Accept" : "application/json",
                }
            })
            .then(response => response.json())
            .then(data => setToken(data.token))
        }catch (error) {
            console.log("error: ", error);
        }
    }

    const findFalcone = () => {
        const findFalconAPI = process.env.REACT_APP_FIND_FALCON_API_URL;
        try {
            fetch(findFalconAPI,{
                method: "POST",
                body: JSON.stringify({
                    "token": token,
                    "planet_names": [
                        selectedPlanets.planet1,
                        selectedPlanets.planet2,
                        selectedPlanets.planet3,
                        selectedPlanets.planet4
                    ],
                    "vehicle_names": [
                        selectedVehicles.vehicle1,
                        selectedVehicles.vehicle2,
                        selectedVehicles.vehicle3,
                        selectedVehicles.vehicle4
                    ]
                }),
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => setRes(data))
        }catch (error) {
            console.log("error: ", error);
        }
    }

    const handleChange = () => {
        getToken();
    }

    useEffect(()=>{
        getPlanets();
        getVehicles();
    },[])

    useEffect(()=>{
        const tempPlanets =  allPlanets.filter(p => !Object.values(selectedPlanets).includes(p.name));
        setFilteredPlanets([...tempPlanets]);
    },[selectedPlanets, allPlanets])

    useEffect(()=>{
        if(token){
            findFalcone();
        }
    },[token])

    const noneEmpty =(obj)=> {
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] === '') {
                return false;
            }
        }
        return true;
    }

    return(
        <>
            <div style={{textAlign: "center"}}>
                <Time/>
            </div>
            <div style={homeStyles.destinationContainer}>
                <div style={homeStyles.destination}>
                    <h3>Destination 1</h3>
                    <PlanetAutocomplete 
                    destinationNo = {"planet1"}
                    vehicleNo = {"vehicle1"}
                    planet = {selectedPlanets.planet1}
                    />
                </div>
                <div style={homeStyles.destination}>
                    <h3>Destination 2</h3>
                    <PlanetAutocomplete 
                    destinationNo = {"planet2"}
                    vehicleNo = {"vehicle2"}
                    planet = {selectedPlanets.planet2}
                    />
                </div>
                <div style={homeStyles.destination}>
                    <h3>Destination 3</h3>
                    <PlanetAutocomplete 
                    destinationNo = {"planet3"}
                    vehicleNo = {"vehicle3"}
                    planet = {selectedPlanets.planet3}
                    />
                </div>
                <div style={homeStyles.destination}>
                    <h3>Destination 4</h3>
                    <PlanetAutocomplete 
                    destinationNo = {"planet4"}
                    vehicleNo = {"vehicle4"}
                    planet = {selectedPlanets.planet4}
                    />
                </div>
            </div>
            <div style={homeStyles.buttonContainer}>
                <button
                disabled={noneEmpty(selectedPlanets) && noneEmpty(selectedVehicles) ? false : true}
                style={{
                    ...homeStyles.findButton,
                    backgroundColor: noneEmpty(selectedPlanets) && noneEmpty(selectedVehicles) ? "#00ABE4" : "#808080",
                }}
                onClick={handleChange}
                >Find Falcone!</button>
            </div>
        </>
    )
}

export default Home