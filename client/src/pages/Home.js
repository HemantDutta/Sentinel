import { useEffect, useState } from "react"
import { Digger } from "../utils/Digger"

export const Home = () => {

    //States
    const [ip, setIp] = useState("");
    const [ipData, setIpData] = useState({});

    //Get IP Higher Order Function
    function getIP(ip) {
        setIp(ip.ip);
        setIpData(ip.data);
        console.log(ip);
    }

    //Get Battery Info Higher Order Function
    function getBatteryInfo(info) {
        console.log(info);
    }

    //Call Battery Info on Battery Events
    useEffect(() => {
        if('getBattery' in navigator) {
            navigator.getBattery().then(function (battery) {
                battery.addEventListener('chargingchange', function () {
                    Digger.fetchBatteryInfo(getBatteryInfo);
                });

                battery.addEventListener('levelchange', function () {
                    Digger.fetchBatteryInfo(getBatteryInfo);
                });

                battery.addEventListener('chargingtimechange', function () {
                    Digger.fetchBatteryInfo(getBatteryInfo);
                });

                battery.addEventListener('dischargingtimechange', function () {
                    Digger.fetchBatteryInfo(getBatteryInfo);
                });
            })
        }
    }, [])

    //Check Data Fetching
    useEffect(() => {
        Digger.fetchIP(getIP);
        Digger.fetchBatteryInfo(getBatteryInfo);
    }, [])

    return (
        <>
            <div className="home" id="home">
            </div>
        </>
    )
}