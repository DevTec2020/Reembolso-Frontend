import { Routes, Route } from "react-router";

import Register from '../pages/Register'
import Refund from '../pages/Refund'
import NotFound from '../pages/NotFound'



export function EmployeeRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Refund/>} />
            <Route path="/cadastro" element={<Register/>} />
            <Route path="/refund" element={<Refund/>} />
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

