const os = require('os');

// Format bytes to human-readable format
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Get memory information
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;
const usagePercent = ((usedMem / totalMem) * 100).toFixed(2);

console.log('Memory Information:');
console.log(`- Total Memory: ${formatBytes(totalMem)}`);
console.log(`- Free Memory: ${formatBytes(freeMem)} (${((freeMem / totalMem) * 100).toFixed(2)}%)`);
console.log(`- Used Memory: ${formatBytes(usedMem)} (${usagePercent}%)`);

// Example: Check if there's enough free memory
const MIN_FREE_MEMORY = 200 * 1024 * 1024; // 200MB
if (freeMem < MIN_FREE_MEMORY) {
  console.warn('Warning: Low on memory!');
} else {
  console.log('System has sufficient memory available');
}
