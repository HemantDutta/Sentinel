import { useEffect, useState } from "react"
import { Digger } from "../utils/Digger"
import { Navbar } from "../components/Navbar"
import "../styles/Home.css";

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
        ip: "",
        userAgent: "",
        referrer: "",
        deviceDimensions: "",
        pluginsExtensions: "",
        connectionDetails: "",
        hardwareInfo: "",
        connectedDevices: "",
        gpuInfo: "",
        memoryInfo: "",
        batteryInfo: ""
    });

    //Error Setter
    function errorSetter(name, value) {
        setErrors({
            ...errors,
            [name]: value
        })
    }

    //Get IP Higher Order Function
    function getIP(ip) {
        if (ip.error) {
            errorSetter("ip", ip.error);
        }
        else {
            setIpData(ip);
        }
    }

    //Get Battery Info Higher Order Function
    function getBatteryInfo(info) {
        if (info.error) {
            errorSetter("batteryInfo", info.error)
        }
        else {
            setBatteryInfo(info);
        }
    }

    //Call Battery Info on Battery Events
    useEffect(() => {
        if ('getBattery' in navigator) {
            try {
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
            catch (err) {
                console.log("Error Occurred while Listening to Battery Events: " + err);
            }
        }
    }, [])

    //Check Data Fetching
    useEffect(() => {
        Digger.fetchIP(getIP);
    }, [])

    //Error Logger (Remove in PROD)
    useEffect(() => {
        console.log(errors);
    }, [errors])

    return (
        <>
            {/* Navbar */}
            <Navbar />
            {/* Navbar End */}
            {/* Home Page */}
            <div className="home relative" id="home">
                {/* Blobs */}
                {/* <div className="blob blob-top -top-24 left-96 z-20" />
                <div className="blob blob-glow -top-24 left-96 z-10" /> */}
                {/* Blobs End */}
                {/* Information Grid */}
                <div className="info-grid pt-32 px-5 relative z-40">
                    <div className="info-item relative p-5 rounded-lg flex flex-col h-full w-full overflow-hidden">
                        <div className="card-glow absolute rounded-full"/>
                        <img src="\assets\info-icons\batteryInfo.png" alt="Battery Information" className="card-icon absolute -top-5 -right-5"/>
                        <span className="title text-white bit-font text-4xl">Battery Info</span>
                        <span className="details text-gray-400">Device's Battery Levels & Charging Status</span>
                        <div className="bullet-grid mt-4">
                            <div className="bullet-item text-white flex items-center gap-x-2">
                                <i className="fa-solid fa-battery"/>
                                <span className="bullet-text">Sample Text</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Information Grid End */}
            </div>
            {/* Home Page End*/}
        </>
    )
}