import { useEffect, useState } from "react"
import { Digger } from "../utils/Digger"
import { Navbar } from "../components/Navbar"
import "../styles/Home.css";
import { InfoItem } from "../components/InfoItem";

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
            console.log(info);
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
        Digger.fetchBatteryInfo(getBatteryInfo);
        setGpuInfo(Digger.fetchGPUInfo())
    }, [])

    //Error Logger (Remove in PROD)
    useEffect(() => {
        console.log(errors);
    }, [errors])

    //Static Data
    let InfoItemData = [
        {
            title: "Battery Info",
            specialClass: "batteryInfo",
            cardIconSrc: "\\assets\\info-icons\\batteryInfo.png",
            text: "Device's Battery Levels & Charging Status",
            bulletData: batteryInfo,
            error: errors.batteryInfo
        },
        {
            title: "GPU Info",
            specialClass: "GpuInfo",
            cardIconSrc: "\\assets\\info-icons\\gpuinfo.png",
            text: "Graphics Card Information",
            bulletData: gpuInfo,
            error: errors.gpuInfo
        }
    ]

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
                    {
                        InfoItemData.map((value, index) => {
                            return (
                                <InfoItem data={value} key={index}/>
                            )
                        })
                    }
                </div>
                {/* Information Grid End */}
            </div>
            {/* Home Page End*/}
        </>
    )
}