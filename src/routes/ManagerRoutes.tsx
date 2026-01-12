import { Routes, Route } from "react-router";


import Login from '../pages/login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Dashboard from "../pages/Dashboard"
import NotFound from '../pages/NotFound'



export function ManagerRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/:id" element={<Dashboard/>}/>
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

