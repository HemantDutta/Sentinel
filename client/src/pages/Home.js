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
        console.log(Digger.fetchMemoryInfo());
    }, [])

    return (
        <>
            <div className="home" id="home">
                Home
            </div>
        </>
    )
}