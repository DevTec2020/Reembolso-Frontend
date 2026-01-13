import { Routes, Route } from "react-router";

import Home from '../pages/Home'
import Collaborator from "../pages/Collaborator"
import NotFound from '../pages/NotFound'



export function ManagerRoutes(){
    return (
        <Routes>
            <Route path="/" element={<Collaborator/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/colaboradores" element={<Collaborator/>}/>
            <Route path="/colaboradores/:id" element={<Collaborator/>}/>
            <Route path='*' element={<NotFound/>} />
        </Routes>
    )
}

