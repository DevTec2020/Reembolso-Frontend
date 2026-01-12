import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from "axios";

import { api } from "../services/api";
import Wallpaper from '../assets/Wallpaper.webp'

export default function Register() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    if (!name || !password) {
      setErrorMessage("Preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    if (password.length < 4) {
      setErrorMessage("A senha deve ter pelo menos 4 dígitos.");
      setIsLoading(false);
      return;
    }

    // Enviando os dados para a API, eu quis que o usuário padrao fosse employee
    try {
      const response = await api.post("/users", {
        name,
        password,
        role: "employee"
      });

      setSuccessMessage(`${response.data.message} Redirecionando...`);
      
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message || "Erro ao criar conta.");
      } else {
        setErrorMessage("Ocorreu um erro inesperado no site.");
      }
      setIsLoading(false);
    }
  }

  return (
    <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
        style={{ backgroundImage: `url(${Wallpaper})` }} 
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Criar Conta</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuário</label>
            <input 
              name="name"
              type="text" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="Digite seu usuário"
              
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input 
              name="password" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="••••••••"
              
            />
          </div>

          <div className="min-h-[24px] text-center text-sm font-medium">
             {errorMessage && <p className="text-red-600">{errorMessage}</p>}
             {successMessage && <p className="text-emerald-600">{successMessage}</p>}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
            
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <Link to="/" className="block mt-4 text-center text-sm text-sky-600 hover:underline">
          Voltar para o Login
        </Link>
      </div>
    </div>
  );
}