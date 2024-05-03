import { useEffect, useState } from "react"
import { Digger } from "../utils/Digger"
import { Navbar } from "../components/Navbar"
import "../styles/Home.css";
import { InfoItem } from "../components/InfoItem";
import { Footer } from "../components/Footer";
import { PreLoader } from "../components/PreLoader";

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

    //Startup Data Fetching
    useEffect(() => {
        Digger.fetchIP(getIP);
        Digger.fetchBatteryInfo(getBatteryInfo);
        setGpuInfo(Digger.fetchGPUInfo())
        setHardwareInfo(Digger.fetchHardwareInfo())
        Digger.fetchConnectedDevices(getConnectedDevices);
        setConnectionDetails(Digger.fetchConnectionDetails());
        setReferrer(Digger.fetchReferrer());
        setUserAgent(Digger.fetchUserAgent());
        setMemoryInfo(Digger.fetchMemoryInfo());
        setDeviceDimensions(Digger.fetchDeviceDimnesions());

        //Connection Detail Fetching on Interval
        const connectionInterval = setInterval(() => {
            setConnectionDetails(Digger.fetchConnectionDetails());
        }, 5000)

        return () => {
            clearInterval(connectionInterval);
        }
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
                {/* TopBar */}
                <div className="TopBar p-5 pt-24 flex items-center justify-between flex-wrap">
                    <div className="referrer-details">
                        <span className="bit-font text-2xl text-gradient">Referrer: </span>
                        <a href={referrer.referrer ?? "#"} className="text-white underline underline-offset-2 transition hover:text-green-400">{referrer.referrer && referrer.referrer.length !== 0 ? referrer.referrer : "Not Found"}</a>
                    </div>
                    <div className="github-source p-2 flex items-center gap-x-2 cursor-pointer" onClick={() => { document.getElementById("git-source").click() }}>
                        <a href="https://github.com/HemantDutta/Sentinel" target="_blank" rel="noreferrer" className="hidden" id="git-source" />
                        <i className="fa-brands fa-github text-white"></i>
                        <span className="bit-font text-2xl text-gradient">Source Code</span>
                    </div>
                </div>
                {/* TopBar End */}
                {/* Information Grid */}
                <div className="info-grid pt-5 px-5 relative z-40">
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
                                <img src="/assets/Home/sen_loader.svg" alt="Loader" className="h-4" />
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
                {/* More Information Flex */}
                <div className="more-info px-5 pt-16 pb-20">
                    <span className="head text-4xl text-white bit-font">More Information</span>
                    <div className="more-info-flex pt-5 p-5 rounded-lg flex items-start flex-wrap gap-x-5 gap-y-10">
                        <div className="more-info-item flex flex-col gap-1">
                            <span className="title text-white text-3xl bit-font">Performance Info</span>
                            <span className="details text-lg text-gray-400">System Performance Information</span>
                            {
                                !errors.memoryInfo &&
                                <div className="more-info-bullet mt-2">
                                    <div className="bullet-item">
                                        <span className="text-white">Allocated Heap Size: {memoryInfo.allocatedSize} GB</span>
                                    </div>
                                    <div className="bullet-item">
                                        <span className="text-white">Total Size: {memoryInfo.totalSize} GB</span>
                                    </div>
                                    <div className="bullet-item">
                                        <span className="text-white">Used Size: {memoryInfo.usedSize} GB</span>
                                    </div>
                                    <div className="bullet-item flex flex-col gap-1 items-start">
                                        <span className="text-white">Performance Test Time: {memoryInfo.performanceTime} ms</span>
                                        <span className="details text-sm text-gray-400">Based on 100 million iteration, single operation loop execution time</span>
                                    </div>
                                </div>
                            }
                            {
                                errors.memoryInfo &&
                                <p className="text-white">Couldn't Fetch Perfomance Information</p>
                            }
                        </div>
                        <div className="more-info-item flex flex-col gap-1">
                            <span className="title text-white text-3xl bit-font">Display Info</span>
                            <span className="details text-lg text-gray-400">Device Display Dimensions</span>
                            {
                                !errors.deviceDimensions &&
                                <div className="more-info-bullet mt-2">
                                    <div className="bullet-item">
                                        <span className="text-white">Screen Width: {deviceDimensions.screenWidth}px</span>
                                    </div>
                                    <div className="bullet-item">
                                        <span className="text-white">Screen Height: {deviceDimensions.screenHeight}px</span>
                                    </div>
                                    <div className="bullet-item">
                                        <span className="text-white">Available Screen Width: {deviceDimensions.screenAvailWidth}px</span>
                                    </div>
                                    <div className="bullet-item">
                                        <span className="text-white">Available Screen Height: {deviceDimensions.screenAvailHeight}px</span>
                                    </div>
                                </div>
                            }
                            {
                                errors.deviceDimensions &&
                                <p className="text-white">Couldn't Fetch Device Dimensions</p>
                            }
                        </div>
                        <div className="more-info-item flex flex-col gap-1">
                            <span className="title text-white text-3xl bit-font">User Agent</span>
                            <span className="details text-lg text-gray-400">Browser Information</span>
                            {
                                !errors.userAgent &&
                                <>
                                    <p className="text-white">{userAgent.userAgent}</p>
                                    <p className="text-gray-400 text-sm">You might be wondering why its showing the name of every single browser in existence. The reason is simple, some sites perform browser sniffing and degrade functionality for unsupported browsers. So browsers like "Chrome" and "Safari" include all browsers in the userAgent string.</p>
                                </>
                            }
                            {
                                errors.userAgent &&
                                <p className="text-white">Couldn't Fetch User Agent</p>
                            }
                        </div>
                    </div>
                </div>
                {/* More Information Flex End */}
            </div>
            {/* Home Page End*/}
            {/* Footer */}
            <Footer/>
            {/* Footer End */}
        </>
    )
}