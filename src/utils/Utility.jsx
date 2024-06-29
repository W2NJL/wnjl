// src/utils/Utility.js
export function convertMMSS(mmss) {
    if (!mmss) return 0;
    const [minutes, seconds] = mmss.split(':').map(Number);
    if (isNaN(minutes) || isNaN(seconds)) return 0;
    return (minutes * 60) + seconds;
}