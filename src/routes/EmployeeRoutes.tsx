import { Routes, Route } from "react-router";

import Register from '../pages/Register'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'



export function EmployeeRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cadastro" element={<Register/>} />
            <Route path="/home" element={<Home/>} />
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

