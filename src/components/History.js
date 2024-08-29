import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { serverURL } from '../util/server';

function History() {
  const [siteHistory, setSiteHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`http://127.0.0.1:5000/getUserHistory/1`);
        setSiteHistory(response.data.history);
      } catch (error) {
        console.error('Failed to fetch site history:', error);
        alert('Failed to fetch site history. Please try again.');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-purple-100">
      <h2 className="text-4xl font-bold text-center text-purple-600 mb-8">Site History</h2>
      <div className="w-3/4">
        {siteHistory.map((site, index) => (
          <div key={index} className="flex items-center justify-between mb-4 bg-white p-4 rounded shadow">
            <span className="text-lg">{site.url}</span>
            <span className={`text-2xl ${site.status === 'safe' ? 'text-green-500' : 'text-red-500'}`}>
              {site.status === 'safe' ? '✔️' : '❌'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;