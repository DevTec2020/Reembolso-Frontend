import logo from "../assets/logo.webp"
import logout from "../assets/logout.webp"

import { useAuth } from "../hooks/useAuth"

export default function Header() {
    const auth  = useAuth()
    const {session, isLoading} = useAuth()


    return (
        <header className="w-full flex items-center justify-between p-4">
            <img src={logo} alt="Logo" className="h-10 rounded-xl"/>

            <div className="flex  items-center gap-3">
                <span className="text-sm font-semibold text-slate-700">
                    olá,{session?.user.role} {auth.session?.user.name || "UserName"}
                </span>

                <img 
                    src={logout} 
                    alt="icone de sair" 
                    className="h-8 rounded-lg cursor-pointer hover:opacuty-75 transition ease-linear"
                    onClick={() => auth.logout()}
                />
            </div>
        </header>
    )
}