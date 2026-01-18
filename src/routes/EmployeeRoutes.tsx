import { Routes, Route } from "react-router";

import Register from '../pages/Register'
import Refund from '../pages/Refund'
import Collaborator from "../pages/Collaborator";



export function EmployeeRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Refund/>} />
            <Route path="/cadastro" element={<Register/>} />
            <Route path="/refund" element={<Refund/>} />
            <Route path="/colaboradores" element={<Collaborator/>}/>
        </Routes>
    )
}

