import { Routes, Route, Navigate } from "react-router-dom";


import Login from '../pages/login'
import Register from '../pages/Register'



export function AuthRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/cadastro" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

