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
    const [ipLoaded, setIpLoaded] = useState(false);

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
            setIpLoaded(true);
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

    //Get Connected Devices Higher Order Function
    function getConnectedDevices(info) {
        if (info.error) {
            errorSetter("connectedDevices", info.error)
        }
        else {
            setConnectedDevices(info.data);
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
        setHardwareInfo(Digger.fetchHardwareInfo())
        Digger.fetchConnectedDevices(getConnectedDevices);
        setConnectionDetails(Digger.fetchConnectionDetails());
    }, [])

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
        },
        {
            title: "Hardware Info",
            specialClass: "HardInfo",
            cardIconSrc: "\\assets\\info-icons\\cpuInfo.png",
            text: "System Hardware Information",
            bulletData: hardwareInfo,
            error: errors.hardwareInfo
        },
        {
            title: "Connected Devices",
            specialClass: "connectedDevices",
            cardIconSrc: "\\assets\\info-icons\\deviceInfo.png",
            text: "Devices Connected to your System",
            bulletData: connectedDevices,
            error: errors.connectedDevices
        },
        {
            title: "Connection",
            specialClass: "connection",
            cardIconSrc: "\\assets\\info-icons\\connectionInfo.png",
            text: "Network Connection Details",
            bulletData: connectionDetails,
            error: errors.connectionDetails
        },
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
                <div className="info-grid pt-32 pb-20 px-5 relative z-40">
                    <div className="info-item ipData relative p-5 rounded-lg flex flex-col h-full w-full overflow-hidden">
                        <div className="card-glow absolute rounded-full z-10" />
                        <img src="\assets\info-icons\ipInfo.png" alt="IP Data" className="card-icon absolute -top-5 -right-5 z-20" />
                        <span className="title text-white bit-font text-4xl relative z-40">IP Data</span>
                        {
                            errors.ip &&
                            <span className="details text-gray-400">{errors.ip}</span>
                        }
                        {
                            !ipLoaded && !errors.ip &&
                            <div className="flex items-center gap-2">
                                <span className="details text-gray-400">Loading IP Data</span>
                                <img src="/assets/Home/sen_loader.svg" alt="Loader" className="h-4"/>
                            </div>
                        }
                        {
                            !errors.ip && ipLoaded &&
                            <>
                                <span className="details text-gray-400 relative z-40">Data Fetched Through Your IP</span>
                                <span className="address text-xl text-cyan-400 ">{ipData.ip}</span>
                                <div className="bullet-grid mt-4 relative z-40">
                                    <div className="bullet-item text-white flex items-center gap-x-2">
                                        <i className="fa-solid fa-city" />
                                        <span className="bullet-text">{ipData.data.city}</span>
                                    </div>
                                    <div className="bullet-item text-white flex items-center gap-x-2">
                                        <i className="fa-solid fa-map" />
                                        <span className="bullet-text">{ipData.data.regionName}</span>
                                    </div>
                                    <div className="bullet-item text-white flex items-center gap-x-2">
                                        <img src={`https://flagsapi.com/${ipData.data.countryCode}/flat/64.png`} className="h-10 rounded-full" alt={`${ipData.data.country}`} />
                                        <span className="bullet-text">{ipData.data.country}</span>
                                    </div>
                                    <div className="bullet-item text-white flex items-center gap-x-2">
                                        <i className="fa-solid fa-clock" />
                                        <span className="bullet-text">{ipData.data.timezone}</span>
                                    </div>
                                    <div className="bullet-item text-white flex items-center gap-x-2">
                                        <i className="fa-solid fa-earth-europe"></i>
                                        <span className="bullet-text">LAT: {ipData.data.lat}</span>
                                    </div>
                                    <div className="bullet-item text-white flex items-center gap-x-2">
                                        <i className="fa-solid fa-earth-asia"></i>
                                        <span className="bullet-text">LON: {ipData.data.lon}</span>
                                    </div>
                                    <div className="bullet-item text-white flex items-center gap-x-2">
                                        <i className="fa-solid fa-building"></i>
                                        <span className="bullet-text">ZIP: {ipData.data.zip}</span>
                                    </div>
                                    <div className="bullet-item text-white flex items-center gap-x-2">
                                        <i className="fa-solid fa-globe" />
                                        <span className="bullet-text">ISP: {ipData.data.isp}</span>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    {
                        InfoItemData.map((value, index) => {
                            return (
                                <InfoItem data={value} key={index} />
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