import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage.tsx';
import NotFound from './components/NotFound/NotFound.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';

const App = () => {
  return (
    <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard/users" element={<Dashboard />} />
            <Route path="/dashboard/billings" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
