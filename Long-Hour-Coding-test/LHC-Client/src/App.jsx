import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Addpatient from './pages/Addpatient';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reports from './pages/Reports';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/newpatient" element={<Addpatient />} />
        <Route path="/reports" element={<Reports />} />
       </Routes>
    </div>
  );
}

export default App;
