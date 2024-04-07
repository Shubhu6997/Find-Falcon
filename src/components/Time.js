import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { PlanetVehicleContext } from "../context/PlanetVehicleContext";

const Time = () => {

    const {count, setCount} = useContext(PlanetVehicleContext);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return(
        <>
            <Typography>Time Taken: {count}</Typography>
        </>
    )
}

export default Time;