import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Authentication/Login";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import ProtectedRoute from "./Helpers/ProtectedRoutes";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { Breadcrumb } from "./Components/Breadcrumb/Breadcrumb";
import { Banner } from './Components/Banner/Banner'

const App = () => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <Banner />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
