const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Device Information Scanner</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; margin: 0; }
        .card { max-width: 500px; margin: 20px auto; background: #1e293b; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        h2 { color: #38bdf8; margin-top: 0; border-bottom: 2px solid #334155; padding-bottom: 10px; }
        .section { margin-bottom: 20px; }
        .item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #334155; font-size: 14px; }
        .label { color: #94a3b8; font-weight: bold; }
        .value { color: #f1f5f9; text-align: right; word-break: break-word; }
    </style>
</head>
<body>

<div class="card">
    <h2>📱 Your Device Hardware Details</h2>
    
    <div class="section">
        <div class="item"><span class="label">Operating System</span><span class="value" id="os">Scanning...</span></div>
        <div class="item"><span class="label">Browser</span><span class="value" id="browser">Scanning...</span></div>
        <div class="item"><span class="label">CPU Logical Cores</span><span class="value" id="cores">Scanning...</span></div>
        <div class="item"><span class="label">Device Memory Class</span><span class="value" id="ram">Scanning...</span></div>
    </div>

    <h2>🖥️ Screen & Display</h2>
    <div class="section">
        <div class="item"><span class="label">Screen Resolution</span><span class="value" id="resolution">Scanning...</span></div>
        <div class="item"><span class="label">Device Pixel Ratio</span><span class="value" id="dpr">Scanning...</span></div>
        <div class="item"><span class="label">GPU Renderer</span><span class="value" id="gpu">Scanning...</span></div>
    </div>

    <h2>🔋 Power & Network</h2>
    <div class="section">
        <div class="item"><span class="label">Battery Level</span><span class="value" id="battery">Scanning...</span></div>
        <div class="item"><span class="label">Network Type</span><span class="value" id="network">Scanning...</span></div>
    </div>
</div>

<script>
    // 1. Core Browser & OS Detection
    const ua = navigator.userAgent;
    document.getElementById('browser').innerText = navigator.appName || "Unknown Browser";
    
    let osName = "Unknown OS";
    if (ua.indexOf("Android") !== -1) osName = "Android Linux";
    else if (ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) osName = "iOS (Apple)";
    else if (ua.indexOf("Windows") !== -1) osName = "Windows PC";
    else if (ua.indexOf("Macintosh") !== -1) osName = "macOS (Apple)";
    document.getElementById('os').innerText = osName;

    // 2. Hardware Specs available via Sandbox
    document.getElementById('cores').innerText = navigator.hardwareConcurrency ? navigator.hardwareConcurrency + " Cores" : "N/A";
    document.getElementById('ram').innerText = navigator.deviceMemory ? navigator.deviceMemory + " GB (Approx)" : "Protected / Unknown";

    // 3. Display Info
    document.getElementById('resolution').innerText = window.screen.width + " x " + window.screen.height;
    document.getElementById('dpr').innerText = window.devicePixelRatio + "x";

    // 4. GPU Detection
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const vendor = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        document.getElementById('gpu').innerText = vendor || "Generic WebGL";
    } catch(e) {
        document.getElementById('gpu').innerText = "Not Supported";
    }

    // 5. Battery Status API
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            document.getElementById('battery').innerText = Math.round(battery.level * 100) + "% " + (battery.charging ? "(Charging)" : "(Discharging)");
        });
    } else {
        document.getElementById('battery').innerText = "Unsupported API";
    }

    // 6. Network Connection API
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
        document.getElementById('network').innerText = conn.effectiveType ? conn.effectiveType.toUpperCase() : "Connected";
    } else {
        document.getElementById('network').innerText = "Online";
    }
</script>

</body>
</html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
});
