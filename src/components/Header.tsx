import logo from "../assets/logo.webp"
import logout from "../assets/logout.webp"

import { useAuth } from "../hooks/useAuth"
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const auth  = useAuth()
    const navigate = useNavigate();

    return (
        <header className="w-full bg-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                <img src={logo} alt="Logo" className="h-10 rounded-xl"/>

                
                <nav className="flex gap-10 text-sm font-semibold uppercase">
                    <p className="cursor-pointer" onClick={() => navigate("/home")}>Enviar</p>
                    <p className="cursor-pointer" onClick={() => navigate("/dashboard")}>Dashboard</p>
                    <p className="cursor-pointer" onClick={() => navigate("/users")}>Usuários</p>
                </nav>
                

                <div className="flex  items-center gap-2">
                    <span className="text-md font-semibold text-slate-700">
                        Olá, {auth.session?.user.name}
                    </span>

                    <img 
                        src={logout} 
                        alt="icone de sair" 
                        className="h-8 rounded-lg cursor-pointer hover:opacuty-75 transition ease-linear"
                        onClick={() => auth.logout()}
                    />
                </div>
            </div>
        </header>
    )
}