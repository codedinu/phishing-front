import React, { useState } from 'react';
import axios from 'axios';
import { serverURL } from '../util/server';

function Home() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  

  const checkSite = async () => {
    setLoading(true);
    setStatus('');
    if (url) {
      try {
        const response = await axios.get(serverURL + 'checkAI?url=' + url);
        let safeStatus = '';
        if (response.data.message === 'We guess it is a safe website') {
          setStatus('safe');
          setLoading(false);
          safeStatus = 'safe';
        } else {
          setStatus('not safe');
          setLoading(false);
          safeStatus = 'not safe';
        }
        if (user) {
          await axios.post(serverURL + 'addHistory', { 'url': url, 'user_id': user.data.user.user_id, 'status': safeStatus });
        }


      } catch (error) {
        console.error('Failed to save site history:', error);
      }
    } else {
      setStatus('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-purple-100">
      <h2 className="text-4xl font-bold text-center text-purple-600">Ensure Your Online Safety</h2>
      <p className="text-lg text-center mt-2">Instantly check if a website is safe to visit.</p>
      <div className="mt-6">
        <input
          type="text"
          className="border-2 border-gray-300 p-2 rounded w-64"
          placeholder="Insert website URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded ml-2"
          onClick={checkSite}
        >
          Check
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => alert('Reported')}
        >
          Report
        </button>
      </div>
      {loading && (
        <div className="mt-8 text-center">
          <div className={`text-2xl font-bold`}>
            Checking.....
          </div>
        </div>
      )}
      {status && (
        <div className="mt-8 text-center">
          <div className={`text-2xl font-bold ${status === 'safe' ? 'text-green-500' : 'text-red-500'}`}>
            {status === 'safe' ? 'This Website Is Safe To Use.' : 'This Website Is Not Safe To Use.'}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;