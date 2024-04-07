import { headerStyles } from "./styles.js/header";
import { useContext } from "react";
import { PlanetVehicleContext } from "../context/PlanetVehicleContext";

const Header = () => {
    const {
        setSelectedPlanets,
        setSelectedVehicles,
        setFilteredPlanets,
        setCount
    } = useContext(PlanetVehicleContext);

    const handleClearState = () => {
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

    return(
        <div style={headerStyles.navContainer}>
            <div 
            style={headerStyles.navTabs}
            onClick={handleClearState}>
                <p>Reset</p>
            </div>
            <div><p>|</p></div>
            <div style={headerStyles.navTabs}>
                <p>
                    <a 
                    href = "https://www.geektrust.com/" 
                    target = "_blank" 
                    rel = "GeekTrust Home"
                    style={headerStyles.homeLink}
                    >GeekTrust Home
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Header;