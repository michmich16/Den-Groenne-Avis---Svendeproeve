import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from './layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { NoPage } from './pages/NoPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { AccountPage } from './pages/AccountPage';
import './App.scss'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path={`/kategori/:category`} element={<CategoryPage />} />
          <Route path={`/login`} element={<LoginPage />} />
          <Route path={`/signup`} element={<SignUpPage />} />
          <Route path={`/produkt/:id`} element={<ProductPage />} />
          <Route path={`/min-konto`} element={<AccountPage />} />
          <Route path={`/*`} element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
