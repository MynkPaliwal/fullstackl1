import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';

function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold">Home</h1>
      <p className="mt-2 text-gray-600">Welcome to the store.</p>
    </div>
  );
}

function Mac() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold">Mac</h1>
      <p className="mt-2 text-gray-600">Explore Mac lineup.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-gray-600">
        Go back to <Link to="/" className="text-blue-600 underline">Home</Link>.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mac" element={<Mac />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
