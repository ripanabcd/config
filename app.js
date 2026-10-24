const os = require('os');
const fs = require('fs');

function getCPUModel() {
    try {
        const cpuInfo = fs.readFileSync('/proc/cpuinfo', 'utf8');
        const match = cpuInfo.match(/Hardware\s*:\s*(.*)/i) || cpuInfo.match(/Processor\s*:\s*(.*)/i);
        return match ? match[1].trim() : 'MediaTek Helio A22 (MT6761)';
    } catch (err) {
        return 'MediaTek Helio A22 (MT6761)';
    }
}

function getExactCoreCount() {
    try {
        // Reads Android's hardware file that lists all present physical cores (e.g., "0-3")
        const presentCores = fs.readFileSync('/sys/devices/system/cpu/present', 'utf8').trim();
        if (presentCores.includes('-')) {
            const range = presentCores.split('-');
            return parseInt(range[1], 10) - parseInt(range[0], 10) + 1;
        }
        return 1;
    } catch (err) {
        // Fallback if the system block file is restricted
        const standardCount = os.cpus().length;
        return standardCount > 0 ? standardCount : "4 (Estimated for MT6761)";
    }
}

function getStorageInfo() {
    try {
        const stats = fs.statfsSync(process.env.HOME || '.');
        const totalSpace = (stats.blocks * stats.bsize) / (1024 * 1024 * 1024);
        const freeSpace = (stats.bavail * stats.bsize) / (1024 * 1024 * 1024);
        return {
            total: totalSpace.toFixed(2) + ' GB',
            free: freeSpace.toFixed(2) + ' GB',
            used: (totalSpace - freeSpace).toFixed(2) + ' GB'
        };
    } catch (err) {
        return { total: 'N/A', free: 'N/A', used: 'N/A' };
    }
}

function displayPhoneDetails() {
    console.log("=========================================");
    console.log("         PHONE SYSTEM DETAILS            ");
    console.log("=========================================");

    // 1. Operating System / Platform Info
    console.log(`\n[ Device / OS Info ]`);
    console.log(`Platform      : ${os.platform()}`);
    console.log(`Architecture  : ${os.arch()}`);
    console.log(`OS Release    : ${os.release()}`);
    console.log(`Uptime        : ${(os.uptime() / 3600).toFixed(2)} hours`);

    // 2. CPU Details (Fixed core count logic)
    console.log(`\n[ CPU Details ]`);
    console.log(`CPU Model     : ${getCPUModel()}`);
    console.log(`Total Cores   : ${getExactCoreCount()} Cores`);

    // 3. RAM (Memory) Details
    const totalRAM = os.totalmem() / (1024 * 1024 * 1024);
    const freeRAM = os.freemem() / (1024 * 1024 * 1024);
    const usedRAM = totalRAM - freeRAM;
    console.log(`\n[ RAM / Memory Info ]`);
    console.log(`Total RAM     : ${totalRAM.toFixed(2)} GB`);
    console.log(`Used RAM      : ${usedRAM.toFixed(2)} GB`);
    console.log(`Free RAM      : ${freeRAM.toFixed(2)} GB`);

    // 4. Storage Details
    const storage = getStorageInfo();
    console.log(`\n[ Internal Storage Info ]`);
    console.log(`Total Storage : ${storage.total}`);
    console.log(`Used Storage  : ${storage.used}`);
    console.log(`Available     : ${storage.free}`);
    console.log("=========================================\n");
}

displayPhoneDetails();
