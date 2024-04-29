import { useEffect } from "react"
import { Digger } from "../utils/Digger"

export const Home = () => {

    //Check Data Fetching
    useEffect(()=>{
        Digger.fetchIP();
        Digger.fetchDeviceDimnesions();
    },[])

    return (
        <>
        <div className="home" id="home">
            Home
        </div>
        </>
    )
}