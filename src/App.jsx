import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage } from './userContext';
import './App.css';
import Home from './components/Home';
import LoginPage from './components/Login/LoginPage';
import ListaControle from './components/Dashboard/listaControle';
import ProtectedRoute from './Helper/ProtectedRoute';
import NotFound from './Helper/NotFound copy';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="lista"
              element={
                <ProtectedRoute>
                  <ListaControle />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}
