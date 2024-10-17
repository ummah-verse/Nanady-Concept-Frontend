// src/hooks/useUsageTracker.js
import { useEffect, useRef } from 'react';
import axios from 'axios';

const useUsageTracker = (userId, token) => {
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!userId || !token) return;

    // Catat waktu mulai saat hook dipasang
    startTimeRef.current = Date.now();

    const sendUsageData = async (durationSeconds) => {
      if (durationSeconds <= 0) return;

      const usageData = { duration: durationSeconds };

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/usage`, usageData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Waktu penggunaan berhasil dikirim ke server.');
      } catch (error) {
        console.error('Error mengirim waktu penggunaan:', error);
      }
    };

    const handleBeforeUnload = () => {
      const endTime = Date.now();
      const durationMs = endTime - startTimeRef.current;
      const durationSeconds = Math.floor(durationMs / 1000);

      // Menggunakan navigator.sendBeacon untuk pengiriman data yang lebih andal saat unload
      const data = JSON.stringify({ duration: durationSeconds });
      navigator.sendBeacon(`${import.meta.env.VITE_API_URL}/api/usage`, data);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Hitung durasi dan kirim data saat komponen di-unmount
      const endTime = Date.now();
      const durationMs = endTime - startTimeRef.current;
      const durationSeconds = Math.floor(durationMs / 1000);

      sendUsageData(durationSeconds);

      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userId, token]);
};

export default useUsageTracker;
