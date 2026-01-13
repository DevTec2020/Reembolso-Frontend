import { Routes, Route } from "react-router";

import Refund from '../pages/Refund'
import Collaborator from "../pages/Collaborator"
import NotFound from '../pages/NotFound'



export function ManagerRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Collaborator/>} />
            <Route path="/Refund" element={<Refund/>} />
            <Route path="/colaboradores" element={<Collaborator/>}/>
            <Route path="/colaboradores/:id" element={<Collaborator/>}/>
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

