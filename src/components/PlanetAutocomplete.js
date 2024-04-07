import { useEffect, useState, useContext } from "react";
import { PlanetVehicleContext } from "../context/PlanetVehicleContext";

const PlanetAutocomplete = ({
    destinationNo,
    vehicleNo,
    planet
}) => {
    const {
        selectedPlanets, 
        setSelectedPlanets,
        vehiclesDetails, 
        selectedVehicles, 
        setSelectedVehicles,
        filteredPlanets
    } = useContext(PlanetVehicleContext);

    const [planetDistance, setPlanetDistance] = useState(0);

    const handlePlanet = (event) => {
        setSelectedPlanets({...selectedPlanets, [destinationNo]: event.target.value})   
    }

    const handleVehicle = (event) => {
        setSelectedVehicles({...selectedVehicles, [vehicleNo]: event.target.value})
    }
    
    useEffect(()=>{
        const pd = filteredPlanets?.filter(item => item.name === planet);
        setPlanetDistance(pd[0]?.distance)
    }, [planet])

    return(
        <div>
            <form>
            <div>
                <input
                value={planet}
                onChange={handlePlanet}
                list={destinationNo} 
                name={destinationNo}/>
                <datalist
                id={destinationNo}>
                {
                   filteredPlanets?.map(item => <option key={item.name} value={item.name}/>)
                } 
                </datalist>
            </div>
            </form>
            {planet ? 
                <div>
                    {
                        vehiclesDetails.map((v) => {
                            return (
                                <div>
                                    <input 
                                    type="radio" 
                                    disabled = {planetDistance > v?.max_distance}
                                    id={v.name} 
                                    name={destinationNo} 
                                    value={v.name}
                                    onChange = {handleVehicle} />
                                    <label
                                    >{`${v.name}(${v.total_no})`}
                                    </label>
                                </div>
                            )
                        })  
                    }
                </div>
            : ""}
        </div>
    )
}

export default PlanetAutocomplete;