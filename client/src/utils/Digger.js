import axios from "axios";

//Server endpoint
const endpoint = "https://sentinel-server.onrender.com";

export const Digger = {
    fetchIP() {
        axios.get(endpoint + "/fetch-ip")
            .then((res) => {
                console.log(res.data);
            })
    },
    fetchUserAgent() {
        console.log(navigator.userAgent);
    },
    fetchReferrer() {
        console.log(document.referrer);
    },
    fetchDeviceDimnesions() {
        let screenWidth = window.screen.width;
        let screenHeight = window.screen.height;
        let screenAvailWidth = window.screen.availWidth;
        let screenAvailHeight = window.screen.availHeight;
        console.log("Screen Width: " + screenWidth);
        console.log("Screen Height: " + screenHeight);
        console.log("Available Screen Width: " + screenAvailWidth);
        console.log("Available Screen Height: " + screenAvailHeight);

    }
}


