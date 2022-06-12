import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminPage from './components/AdminPage';
import SubmitForm from './components/SubmitForm';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<SubmitForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
