import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure you have configured Firestore in firebaseConfig.js
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [currentUsage, setCurrentUsage] = useState(0);
  const [totalUsage, setTotalUsage] = useState(0);
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState(null);
  const [hourlyUsage, setHourlyUsage] = useState(Array(24).fill(0)); // Initialize with zeros
  const [dailyUsage, setDailyUsage] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const usageQuery = query(
      collection(db, `users/${userId}/water_usage`),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(usageQuery, (snapshot) => {
      let total = 0;
      const hourlyData = Array(24).fill(0); // Initialize an array to store hourly usage
      const dailyData = {}; // Initialize an object to store daily usage

      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Document data:', data); // Log each document's data

        total += data.usage_liters;

        // Parse the Firestore timestamp correctly
        const timestamp = data.timestamp.toDate();
        const hour = timestamp.getHours(); // Use getHours to get the hour in local time
        hourlyData[hour] += data.usage_liters; // Accumulate usage for each hour

        // Accumulate daily usage
        const date = timestamp.toDateString();
        if (!dailyData[date]) {
          dailyData[date] = 0;
        }
        dailyData[date] += data.usage_liters;
      });

      console.log('Total usage:', total); // Log total usage
      console.log('Hourly data before setting state:', hourlyData); // Log hourly data before setting state

      setTotalUsage(total);
      setHourlyUsage(hourlyData);
      setDailyUsage(Object.entries(dailyData).map(([date, usage]) => ({ date, usage })));


      if (!snapshot.empty) {
        const latestDoc = snapshot.docs[0];
        const latestData = latestDoc.data();
        setCurrentUsage(latestData.usage_liters);
        setStatus(latestData.status);
      }

      console.log('Hourly Data after setting state:', hourlyData); // Log hourly data after setting state
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    if (status === 'leak_detected') {
      alert('Leak detected!');
    }
  }, [status]);

  const lineData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Labels for each hour
    datasets: [
      {
        label: 'Water Usage (liters)',
        data: hourlyUsage,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  const barData = {
    labels: dailyUsage.map((entry) => entry.date), // Labels for each day
    datasets: [
      {
        label: 'Daily Water Usage (liters)',
        data: dailyUsage.map((entry) => entry.usage),
        backgroundColor: 'green',
        borderColor: 'green',
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Current Water Usage</h2>
          <p className="text-2xl">{currentUsage} liters</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Total Usage for Today</h2>
          <p className="text-2xl">{totalUsage.toFixed(3)} liters</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Hourly Water Usage</h2>
        <Line data={lineData} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Daily Water Usage</h2>
        <Bar data={barData} />
      </div>
      </div>
    </div>
  );
};

export default Dashboard;