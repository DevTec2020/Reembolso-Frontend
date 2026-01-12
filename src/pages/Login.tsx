import { use, useState } from "react";
import { useActionState } from "react"
import { AxiosError } from "axios";
import { Link, useNavigate } from 'react-router-dom';

import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

import Wallpaper from '../assets/Wallpaper.webp'

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);



  async function handleSignIn(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const user = formData.get("user") as string;
    const password = formData.get("password") as string;

    //Levando os dados para a api
    try {
      const response = await api.post("/sessions", {
        name: user,
        password: password
      });

      // Salvando e redireciobnando
      auth.save(response.data)
      navigate("/")

    } catch (error) {
      // Verificando se é um erro do Axios
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Erro ao conectar com o servidor.");
        }
      } else {
        // Erro que não são do Axios 
        setErrorMessage("Não foi possível entrar. Tente novamente.");
      }
      
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  }

  return (
    <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
        style={{ backgroundImage: `url(${Wallpaper})` }} 
        >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuário</label>
            <input 
              name="user"
              type="text" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input 
              name="password"
              type="password" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="min-h-[24px]">
             {errorMessage && (
                <p className="text-sm text-red-600 text-center font-medium">
                  {errorMessage}
                </p>
             )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
            
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          Não tem uma conta? <Link to="/cadastro" className="text-sky-600 hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}