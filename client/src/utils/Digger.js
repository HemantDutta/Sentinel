import axios from "axios";

//Server endpoint
const endpoint = "https://sentinel-server.onrender.com";

//Internal Functions
function fetchUserInfoFromIp(ip, fn) {
    axios.get("http://ip-api.com/json/" + ip)
        .then((res) => {
            fn({ ip: ip, data: res.data });
        })
}

//Digger Object
export const Digger = {
    fetchIP(fn) {
        axios.get(endpoint + "/fetch-ip")
            .then((res) => {
                fetchUserInfoFromIp(res.data.ip, fn);
            })
    },
    fetchUserAgent() {
        return { userAgent: navigator.userAgent };
    },
    fetchReferrer() {
        return { referrer: document.refer }
    },
    fetchDeviceDimnesions() {
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;
        let screenAvailWidth = window.screen.availWidth;
        let screenAvailHeight = window.screen.availHeight;
        return { screenWidth, screenHeight, screenAvailHeight, screenAvailWidth };
    },
    fetchPluginsExtensions() {
        let plugins = navigator.plugins;
        let extensions = navigator.userAgent;
        return { plugins, extensions };
    },
    fetchConnectionDetails() {
        if (navigator.connection) {
            let connectionType = navigator.connection.effectiveType;
            let connectionSpeed = navigator.connection.downlink;
            return { connectionType, connectionSpeed };
        } else {
            return { error: "Connection Details Not Found" }
        }
    },
    fetchHardwareInfo() {
        let platform = navigator.userAgentData.platform;
        let logicalProcessors = navigator.hardwareConcurrency;
        return { platform, logicalProcessors };
    },
    fetchConnectedDevices() {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                console.log("Available Devices:");
                return devices;
            })
            .catch(error => {
                return { error: "Not Found" };
            });
    },
    fetchGPUInfo() {
        let canvas = document.createElement('canvas');
        let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            let vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            return { renderer, vendor };
        } else {
            return { error: "Not Found" };
        }
    },
    fetchMemoryInfo() {
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
    },
    fetchBatteryInfo() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(function (battery) {
                console.log("Battery Level: " + (battery.level * 100) + "%");
                console.log("Charging: " + (battery.charging ? "Yes" : "No"));
                console.log("Charging Time: " + battery.chargingTime + " seconds");
                console.log("Discharging Time: " + battery.dischargingTime + " seconds");

                battery.addEventListener('chargingchange', function () {
                    console.log("Charging: " + (battery.charging ? "Yes" : "No"));
                });

                battery.addEventListener('levelchange', function () {
                    console.log("Battery Level: " + (battery.level * 100) + "%");
                });

                battery.addEventListener('chargingtimechange', function () {
                    console.log("Charging Time: " + battery.chargingTime + " seconds");
                });

                battery.addEventListener('dischargingtimechange', function () {
                    console.log("Discharging Time: " + battery.dischargingTime + " seconds");
                });
            });
        } else {
            console.log("Battery Status API is not supported in this browser.");
        }

    }
}


