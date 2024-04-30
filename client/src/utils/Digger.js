import axios from "axios";

//Server endpoint
const endpoint = "https://sentinel-server.onrender.com";

//Internal Functions
function fetchUserInfoFromIp(ip, fn) {
    axios.get("http://ip-api.com/json/" + ip)
        .then((res) => {
            fn({ ip: ip, data: res.data });
        })
        .catch(err => {
            fn({error: "IP Details Not Found"});
        }) 
}

//Digger Object
export const Digger = {
    fetchIP(fn) {
        try {
            axios.get(endpoint + "/fetch-ip")
            .then((res) => {
                fetchUserInfoFromIp(res.data.ip, fn);
            })
            .catch(err => {
                fn({error: "IP Details Not Found"});  
            })
        }
        catch(err) {
            return { error: "IP Details Not Found" };
        }
    },
    fetchUserAgent() {
        return { userAgent: navigator.userAgent };
    },
    fetchReferrer() {
        return { referrer: document.refer }
    },
    fetchDeviceDimnesions() {
        try {
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            let screenAvailWidth = window.screen.availWidth;
            let screenAvailHeight = window.screen.availHeight;
            return { screenWidth, screenHeight, screenAvailHeight, screenAvailWidth };
        }
        catch(err) {
            return {error: "Device Dimensions Not Found"};
        }
    },
    fetchPluginsExtensions() {
        try {
            let plugins = navigator.plugins;
            let extensions = navigator.userAgent;
            return { plugins, extensions };
        }
        catch(err) {
            return { error: "Plugins & Extensions Not Found" };
        }
    },
    fetchConnectionDetails() {
        try {
            if (navigator.connection) {
                let connectionType = navigator.connection.effectiveType;
                let connectionSpeed = navigator.connection.downlink;
                return { connectionType, connectionSpeed };
            } else {
                return { error: "Connection Details Not Found" };
            }
        }
        catch(err) {
            return { error: "Connection Details Not Found" };
        }
    },
    fetchHardwareInfo() {
        try {
            let platform = navigator.userAgentData.platform;
            let logicalProcessors = navigator.hardwareConcurrency;
            return { platform, logicalProcessors };
        }
        catch(err) {
            return {error: "Hardware Information Not Found"};
        }
    },
    fetchConnectedDevices() {
        try {
            navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                console.log("Available Devices:");
                return devices;
            })
            .catch(error => {
                return {error: "Connected Devices Not Found"};
            });
        }
        catch(err) {
            return {error: "Connected Devices Not Found"};
        }
    },
    fetchGPUInfo() {
        try {
            let canvas = document.createElement('canvas');
            let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                let vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
                return { renderer, vendor };
            } else {
                return { error: "GPU Information Not Found" };
            }
        }
        catch(err) {
            return { error: "GPU Information Not Found" };
        }
    },
    fetchMemoryInfo() {
        try {
            let bytes = Math.pow(1024, 3);
            let approxMemory = navigator.deviceMemory;
            let { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
            let startTime = window.performance.now();
            for (let i = 0; i < 10000000; i++) {
                let temp = i + 1;
            }
            let endTime = window.performance.now();
            let elapsedTime = endTime - startTime;
            return { allocatedSize: Math.ceil(jsHeapSizeLimit), totalSize: Math.ceil(totalJSHeapSize), usedSize: Math.ceil(usedJSHeapSize), performanceTime: Math.ceil(elapsedTime), approxMemory };
        }
        catch(err) {
            return {error: "Memeory Information Not Found"};
        }
    },
    fetchBatteryInfo(fn) {
        try {
            if ('getBttery' in navigator) {
                navigator.getBattery().then(function (battery) {
                    let batteryLevel = (battery.level * 100) + "%";
                    let chargingStatus = battery.charging ? "Yes" : "No";
                    let chargingTime = battery.chargingTime + " seconds";
                    let dischargingtime = battery.dischargingTime + " seconds";
    
                    fn({ batteryLevel, chargingStatus, chargingTime, dischargingtime });
                });
            } else {
                fn({ error: "Battery Information Not Found" });
            }
        }
        catch(err) {
            fn({ error: "Battery Information Not Found" });
        }
    }
}


