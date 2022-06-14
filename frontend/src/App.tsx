import React, {useEffect, useState} from 'react';
import {
    BrowserRouter,
    Route,
    Routes, Navigate
} from "react-router-dom";
import './App.css';
import {UserLayout} from "./layout/user";
import {UserDashboard} from "./pages/user/dashboard";
import {Login} from "./pages/login";
import {AdminDashboard} from "./pages/admin/dashboard";
import {AdminLayout} from "./layout/admin";

function App() {
    return (
        <>
            <BrowserRouter>
                {
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/login"/>}
                        />
                        <Route path="/user" element={<UserLayout/>}>
                            <Route path="/user/dashboard" element={<UserDashboard/>}/>
                        </Route>
                        <Route path="/admin" element={<AdminLayout/>}>
                            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                        </Route>
                        <Route
                            element={<Login/>}
                            path="/login"
                        />
                    </Routes>
                }
            </BrowserRouter>
        </>
    );
}

export default App;
