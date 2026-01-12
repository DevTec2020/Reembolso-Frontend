import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import Header from '../components/Header';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

import { 
  FaUsers, 
  FaUserTie, 
  FaUser, 
  FaSignOutAlt, 
  FaSpinner, 
  FaExclamationTriangle,
  FaIdCard,
  FaCalendarAlt
} from 'react-icons/fa';

interface UserData {
  id: string;
  name: string;
  role: "manager" | "employee";
  createdAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = useAuth();
  
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          setErrorMessage("Acesso Negado: Apenas gerentes podem visualizar esta lista.");
          
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } else {
          setErrorMessage("Não foi possível carregar a lista de usuários.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-300">
      <Header />
      
      <div className="flex-1 flex justify-center items-start p-6">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden mt-4">
          <div className="bg-sky-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3 text-white">
              <FaUsers className="text-2xl" />
              <h1 className="text-xl font-bold">Gestão de Usuários</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sky-100 text-sm hidden sm:block">
                Total: {users.length}
              </span>
              
            </div>
          </div>

          <div className="p-6">
            
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <FaSpinner className="animate-spin text-4xl text-sky-600 mb-3" />
                <p className="font-medium">Carregando usuários...</p>
              </div>
            )}

            {!isLoading && errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 flex flex-col items-center justify-center text-center gap-3">
                <FaExclamationTriangle className="text-4xl text-red-500" />
                <h3 className="text-lg font-bold text-red-700">Ops! Algo deu errado.</h3>
                <p className="text-slate-600">{errorMessage}</p>
              </div>
            )}

            {!isLoading && !errorMessage && (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-xs font-bold tracking-wider">
                    <tr>
                      <th className="p-4 border-b">Usuário</th>
                      <th className="p-4 border-b">Cargo</th>
                      <th className="p-4 border-b">ID do Sistema</th>
                      <th className="p-4 border-b">Cadastrado em</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                        
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-sky-100 p-2 rounded-full text-sky-600 group-hover:bg-sky-200 transition-colors">
                              <FaUser />
                            </div>
                            <span className="font-semibold text-slate-700 text-base">
                              {user.name}
                            </span>
                          </div>
                        </td>

                        <td className="p-4">
                          {user.role === 'manager' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                              <FaUserTie /> MANAGER
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                              <FaUser /> EMPLOYEE
                            </span>
                          )}
                        </td>

                        <td className="p-4 font-mono text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                            <FaIdCard className="text-slate-300" />
                            {user.id}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-slate-300" />
                            {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <div className="p-10 text-center text-slate-500">
                    <p>Nenhum usuário encontrado no sistema.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}