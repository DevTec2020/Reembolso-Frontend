import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { FaCloudUploadAlt, FaFileAlt, FaCheck, FaTrash } from 'react-icons/fa';

import { api } from '../services/api';
import Header from '../components/Header';

interface RefundAPIResponse {
  id: string
  name: string
  category: string
  amount: number
  filename: string
  createdAt: string
}


export default function Refund() {
  const navigate = useNavigate()
  const params = useParams<{id: string}>()

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [fileURL, setFileURL] = useState<string | null>(null)


  //Limpando o form
  function handleClear (){
    setName("")
    setCategory("")
    setAmount("")
    setFile(null)
    setFileURL(null)
  };

  // Editando valor digitado
  function formatCurrencyInput(value: string){
    //Travando para receber só números 
    const onlyNumbers = value.replace(/\D/g, "");

    //Converte para numero divide por 100 para considerar os centavos 
    const numberValue = Number(onlyNumbers) / 100;

    //Convertendo para o formato BRL
    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(formatCurrencyInput(value));
  };

  // Recebendo o arquivo
  function handleFileChange( e: React.ChangeEvent<HTMLInputElement>){
    if( e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  // Envia tudo com o submit do form
  async function onSubmit(e: React.FormEvent){
    e.preventDefault()

    // Se tiver Id o botão fica como voltar
    if(params.id) {
      return navigate(-1)
    }

    try {
      setIsLoading(true)

      if (!file){
        return alert("Selecione um arquivo de comprovante")
      }

       // tirando tudo que não é número
      const amountClean = amount.replace(/\D/g, "")
      
      if (!amountClean) {
        return alert("Informe um valor válido.")
      }

      // Upload do arquivo 
      const fileUploadForm = new FormData()
      fileUploadForm.append("file", file)

      const responseUpload = await api.post("/uploads", fileUploadForm)
      const { filename } = responseUpload.data

      // Enviandoo tudo para a api
      const formattedAmount = Number(amountClean) / 100

      await api.post("/refunds", {
        name,
        category,
        amount: formattedAmount,
        filename: filename,
      })

      alert("Envio realizado com sucesso!")
      handleClear();

    } catch(error){
      console.log(error)

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message || "Erro na requisição.")
      }

      alert("Não foi possivel realizar a solicitação.")

    } finally {
      setIsLoading(false)
    }
  }


  async function fetchRefund( id: string ) {
    try{
        const { data } = await api.get<RefundAPIResponse>(`/refunds/${id}`)
        
        setName(data.name)
        setCategory(data.category)
        setAmount(String(data.amount))
        setFileURL(data.filename)

    }catch (error) {
        console.log(error)
        
        if(error instanceof AxiosError) {
            return alert(error.response?.data.message)
        }

        alert("Não foi possível carregar os refunds.")
        navigate("/")

    }
  }


  useEffect(() => {
    if(params.id) {
      fetchRefund(params.id)
    }
  }, [params.id]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-300">
        <Header/>
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-sky-600 p-4">
            <h1 className="text-2xl font-bold text-white text-center">
              {params.id ? "Detalhes do Reembolso" : "Solicitar Reembolso"}
            </h1>
          </div>
          
          <form onSubmit={onSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição do Gasto</label>
              <input 
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!!params.id}
                placeholder="Ex: Almoço"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tipo de Gasto</label>
                <select 
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={!!params.id}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="" disabled hidden>Selecione...</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Hospedagem">Hospedagem</option>
                  <option value="services">Serviços</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Valor (R$)</label>
                <input 
                  required
                  type="text"
                  step="0.01"
                  value={amount}
                  onChange={handleAmountChange}
                  disabled={!!params.id}
                  placeholder="0,00"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            {params.id && fileURL ? (
              //Visualizando
              <div className='flex justify-center'>
                <a href={`http://localhost:3333/uploads/${fileURL}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sky-600 hover:text-sky-800 font-semibold transition-colors"
                >
                  <FaFileAlt/>
                </a>
              </div>
            ):(
              //Enviando comprovante 
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors relative">
                <input 
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,application/pdf"
                />

                <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-2">
                  {file ? (
                    <>
                      <FaCheck className="text-3xl text-green-500" />
                      <span className="text-slate-700 font-medium break-all">
                        Arquivo selecionado: <span className="text-sky-600">{file.name}</span>
                      </span>
                      <span className="text-xs text-slate-500">Clique para trocar</span>
                    </>
                  ):(
                    <>
                      <FaCloudUploadAlt className="text-3xl text-slate-400" />
                      <span className="text-sky-600 font-medium">Clique para enviar o comprovante</span>
                      <span className="text-xs text-slate-500">Formato: JPG, PNG ou PDF</span>
                    </>
                  )}
                </label>

                {file && (
                  <button 
                    type="button"
                    onClick={() => setFile(null)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                    title="Remover arquivo"
                  >
                    <FaTrash/>
                  </button>
                )}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {!params.id && (
                <button 
                  type="button"
                  onClick={handleClear}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
                >
                  Cancelar
                </button>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className={`flex-1 px-4 py-3 bg-sky-600 text-white rounded-lg font-bold transition-colors shadow-lg 
                            ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-sky-700 cursor-pointer"}
                `} 
              >
                {isLoading ? "Enviando..." : (params.id ? "Voltar" : "Enviar comprovante")}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}