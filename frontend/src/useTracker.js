import { useState, useEffect } from 'react';

const useTracker = (contentID) => {
  const [metrics, setMetrics] = useState({
    cursorX: 0,
    cursorY: 0,
    dwellTime: 0,
    clickLatency: 0,
    startTime: Date.now()
  });

  useEffect(() => {
    const handleMove = (e) => {
      setMetrics(prev => ({
        ...prev,
        cursorX: e.clientX,
        cursorY: e.clientY,
        dwellTime: Date.now() - prev.startTime
      }));
    };

    const handleClick = () => {
      console.log(`ML Data Logged for ${contentID}:`, metrics);
      // Future: fetch('/api/log/', { method: 'POST', body: JSON.stringify(metrics) });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('click', handleClick);
    };
  }, [contentID, metrics]);

  return metrics;
};

export default useTracker;