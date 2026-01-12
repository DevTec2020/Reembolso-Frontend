import { useState, useEffect, createContext, ReactNode } from "react"
import { api } from "../services/api"


type UserAPIResponse = {
    token: string
    user: {
        id: string
        name: string
        email: string
        role: "employee" | "manager"
    }
}

type AuthContextType = {
    isLoading: boolean
    session: null | UserAPIResponse
    save: (data: UserAPIResponse) => void
    logout: () => void
}


//Chave para garantir que ele recupere dados apenas do meu app
const LOCAL_STORAGE_KEY = "@reembolso"

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: {children: ReactNode}){
    const [session, setSession] = useState<null | UserAPIResponse>(null)
    const [isLoading, setIsLoading] = useState(true)

    //Salva a sessão no localStorage para consulta e não pedir novamente no F5
    function save(data: UserAPIResponse){
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)

        api.defaults.headers.common["Authorization"] = `ToDeOlho ${data.token}`

        setSession(data)
    }


    //Valida se esta logado para não ficar pedindo para logar
    function loadUser(){
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

        if(user && token){
            api.defaults.headers.common["Authorization"] = `ToDeOlho ${token}`

            setSession({
                token,
                user: JSON.parse(user)
            })
        }

        setIsLoading(false)
    }

    //Faz o logout e remove os dados do localStorage
    function logout(){
        setSession(null)

        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

        window.location.assign("/")
    }

    //Garantindo que o loadUser rode apenas uma vez ao abrir o site
    useEffect(() => {
        loadUser()
    },[])

    return(
        <AuthContext.Provider value={{session, save, isLoading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}