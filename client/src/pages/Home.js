import { useEffect, useState } from "react"
import { Digger } from "../utils/Digger"

export const Home = () => {

    //States
    const [ipData, setIpData] = useState({});
    const [userAgent, setUserAgent] = useState("");
    const [referrer, setReferrer] = useState("");
    const [deviceDimensions, setDeviceDimensions] = useState({});
    const [pluginsExtensions, setPluginsExtensions] = useState({});
    const [connectionDetails, setConnectionDetails] = useState({});
    const [hardwareInfo, setHardwareInfo] = useState({});
    const [connectedDevices, setConnectedDevices] = useState([]);
    const [gpuInfo, setGpuInfo] = useState({});
    const [memoryInfo, setMemoryInfo] = useState({});
    const [batteryInfo, setBatteryInfo] = useState({});

    //Error Handling State
    const [errors, setErrors] = useState({
        ip: false,
        userAgent: false,
        referrer: false,
        deviceDimensions: false,
        pluginsExtensions: false,
        connectionDetails: false,
        hardwareInfo: false,
        connectedDevices: false,
        gpuInfo: false,
        memoryInfo: false,
        batteryInfo: false
    });

    //Error Setter
    function errorSetter(name) {
        setErrors({
            ...errors,
            [name]: true
        })
    }

    //Get IP Higher Order Function
    function getIP(ip) {
        if(ip.error) {
            errorSetter("ip");
        }
        else {
            setIpData(ip);
        }
    }

    //Get Battery Info Higher Order Function
    function getBatteryInfo(info) {
        if(info.error) {
            errorSetter("batteryInfo")
        }
        else {
            setBatteryInfo(info);
        }
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
    }, [])

    //Error Logger (Remove in PROD)
    useEffect(()=>{
        console.log(errors);
    },[errors])

    return (
        <>
            <div className="home" id="home">
                
            </div>
        </>
    )
}