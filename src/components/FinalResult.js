import { PlanetVehicleContext } from "../context/PlanetVehicleContext";
import { useContext } from "react";
import { finalResultStyles } from "./styles.js/finalResult";

const FinalResult = () => {
    const {
        res,
        setRes,
        setSelectedPlanets,
        setSelectedVehicles,
        setFilteredPlanets, 
        count,
        setCount
    } = useContext(PlanetVehicleContext);

    const handleClearState = () => {
        setRes({});
        setSelectedPlanets({
            planet1: "",
            planet2: "",
            planet3: "",
            planet4: ""
        });
        setSelectedVehicles({
            vehicle1: "",
            vehicle2: "",
            vehicle3: "",
            vehicle4: "",
        });
        setFilteredPlanets([]);
        setCount(0);
    }

    const handleRestart = () => {
        handleClearState();
    }

    return(
        <div style={finalResultStyles.container}>
            {res?.status === "success" ? 
            (<div>
                <div>
                    <h2>Success! Congratulations on Finding Falcon. King Shan is mighty pleased.</h2>
                </div>
                <div style={finalResultStyles.subHeading}>
                    <h3>Time Taken: {count}</h3>
                </div>
                <div style={finalResultStyles.subHeading}>
                    <h3>Planet Found: {res?.planet_name}</h3>
                </div>
            </div>)
            : (
                <div>
                    Failed to find Falcon. Please try again!
                </div>
            )}
            <div>
                <button 
                style={finalResultStyles.button}
                onClick={handleRestart}>Start Again</button>
            </div>
        </div>

        
       
    )
}

export default FinalResult;