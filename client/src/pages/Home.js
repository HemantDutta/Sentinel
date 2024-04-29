import { useEffect, useState } from "react"
import { Digger } from "../utils/Digger"

export const Home = () => {

    //temp states
    const [speed, setSpeed] = useState("");

    //Get IP
    function getIP(ip) {
        console.log(ip);
    }

    //Check Data Fetching
    useEffect(() => {
        Digger.fetchBatteryInfo();
    }, [])

    return (
        <>
            <div className="home" id="home">
                Home
            </div>
        </>
    )
}