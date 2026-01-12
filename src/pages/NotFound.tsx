import { useAuth } from "../hooks/useAuth"

export default function NotFound() {
    const auth  = useAuth()
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#003359] p-6">
            <div className="flex flex-col">
                <p className="text-9xl mb-7 text-center">🚨</p>
                <h1 className="text-gray-100 font-semibold text-2xl mb-10">
                     ⚠️ Ops! Essa página não existe. ⚠️ 
                </h1>

                <a href="/" onClick={() => auth.logout()} className="font-semibold text-center text-amber-400 hover:text-amber-600 transition ease-linear">
                    Voltar para o início
                </a>

            </div>
        </div>
    )
}