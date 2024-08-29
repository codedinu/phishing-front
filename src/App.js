import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Header from './common/Header';
import Footer from './common/Footer';
import Register from './components/Register';
import History from './components/History';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-grow">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/history' element={<History />} />
          </Routes>
          <Footer />
        </main>
        
      </div>
    </Router>
  );
}

export default App;