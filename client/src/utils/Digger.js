import axios from "axios";

//Server endpoint
const endpoint = "https://sentinel-server.onrender.com";

//Internal Functions
function fetchUserInfoFromIp(ip, fn) {
    axios.post(endpoint + "/ip-data", {
        ip: ip
    })
        .then((res) => {
            fn({ ip: ip, data: res.data });
        })
        .catch(err => {
            fn({ error: "IP Details Not Found" });
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
                    fn({ error: "IP Details Not Found" });
                })
        }
        catch (err) {
            return { error: "IP Details Not Found" };
        }
    },
    fetchUserAgent() {
        return { userAgent: navigator.userAgent };
    },
    fetchReferrer() {
        return { referrer: document.referrer }
    },
    fetchDeviceDimnesions() {
        try {
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            let screenAvailWidth = window.screen.availWidth;
            let screenAvailHeight = window.screen.availHeight;
            return { screenWidth, screenHeight, screenAvailHeight, screenAvailWidth };
        }
        catch (err) {
            return { error: "Device Dimensions Not Found" };
        }
    },
    fetchPluginsExtensions() {
        try {
            let plugins = navigator.plugins;
            let extensions = navigator.userAgent;
            return { plugins, extensions };
        }
        catch (err) {
            return { error: "Plugins & Extensions Not Found" };
        }
    },
    fetchConnectionDetails() {
        try {
            if (navigator.connection) {
                let connectionType = navigator.connection.effectiveType;
                let connectionSpeed = navigator.connection.downlink;
                return {
                    connectionType: {
                        icon: "fa-solid fa-wifi",
                        value: connectionType
                    }, connectionSpeed: {
                        icon: "fa-solid fa-gauge",
                        value: connectionSpeed + " Mbps"
                    }
                };
            } else {
                return { error: "Connection Details Not Found" };
            }
        }
        catch (err) {
            return { error: "Connection Details Not Found" };
        }
    },
    fetchHardwareInfo() {
        try {
            let platform = navigator.userAgentData.platform;
            let logicalProcessors = navigator.hardwareConcurrency;
            return {
                platform: {
                    icon: platform.match(/win/gi) ? "fa-brands fa-windows" : platform.match(/android/gi) ? "fa-brands fa-android" : platform.match(/linux/gi) ? "fa-brands fa-linux" : platform.substring(0, 1) === "i" || platform.match(/mac/gi) ? "fa-brands fa-apple" : "fa-solid fa-computer",
                    value: platform
                }, logicalProcessors: {
                    icon: "fa-solid fa-microchip",
                    value: logicalProcessors + " cores"
                }
            };
        }
        catch (err) {
            return { error: "Hardware Information Not Found" };
        }
    },
    fetchConnectedDevices(fn) {
        try {
            navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    fn({ error: "", data: devices });
                })
                .catch(error => {
                    fn({ error: "Connected Devices Not Found" });
                });
        }
        catch (err) {
            fn({ error: "Connected Devices Not Found" });
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
                return {
                    renderer: {
                        icon: "fa-solid fa-gamepad",
                        value: renderer.match(/angle/gi) ? renderer.substring(7, 42) + "..." : renderer
                    }, vendor: {
                        icon: "fa-solid fa-copyright",
                        value: vendor
                    }
                };
            } else {
                return { error: "GPU Information Not Found" };
            }
        }
        catch (err) {
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
            return { allocatedSize: Math.ceil(jsHeapSizeLimit/bytes), totalSize: Math.ceil(totalJSHeapSize/bytes), usedSize: Math.ceil(usedJSHeapSize/bytes), performanceTime: Math.ceil(elapsedTime), approxMemory };
        }
        catch (err) {
            return { error: "Memeory Information Not Found" };
        }
    },
    fetchBatteryInfo(fn) {
        try {
            if ('getBattery' in navigator) {
                navigator.getBattery().then(function (battery) {
                    let batteryLevel = (battery.level * 100);
                    let chargingStatus = battery.charging ? "Yes" : "No";
                    let chargingTime = battery.chargingTime + " seconds";
                    let dischargingtime = battery.dischargingTime + " seconds";

                    fn({
                        batteryLevel: {
                            icon: batteryLevel >= 50 && batteryLevel < 75 ? "fa-solid fa-battery-half" : batteryLevel >= 75 && batteryLevel < 90 ? "fa-solid fa-battery-three-quarters" : batteryLevel >= 90 ? "fa-solid fa-battery-full" : "fa-solid fa-battery-quarter",
                            value: batteryLevel + "%"
                        }, chargingStatus: {
                            icon: chargingStatus === "Yes" ? "fa-solid fa-plug" : "fa-solid fa-plug-circle-xmark",
                            value: chargingStatus === "Yes" ? "Charging" : "Not Charging"
                        }
                    });
                });
            } else {
                fn({ error: "Battery Information Not Found" });
            }
        }
        catch (err) {
            fn({ error: "Battery Information Not Found" });
        }
    }
}


