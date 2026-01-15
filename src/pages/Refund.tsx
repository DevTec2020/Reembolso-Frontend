import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { api } from '../services/api';

import Header from '../components/Header';

export default function Refund() {
  const [formData, setFormData] = useState({ descricao: '', tipo: '', valor: '' });
  const handleClear = () => setFormData({ descricao: '', tipo: '', valor: '' });

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<string | null>(null)
  const [fileURL, setFileURL] = useState<string | null>(null)

  const navigate = useNavigate()
  const params = useParams<{id: string}>()

  async function onSubmit(e: React.FormEvent){
    e.preventDefault()

    if(params.id) {
      return navigate(-1)
    }

    try {
      setIsLoading(true)

      if (!file){
        return alert("Selecione um arquivo de comprovante")
      }

      const fileUploadForm = new FormData()
      fileUploadForm.append("file", file)

      const response = await api.post("/uploads", fileUploadForm)

      await api.post("/refunds"), {
        ...data,
        filename: response.data.filename,
      }
      navigate("/confirm", {state: {fromSubmit: true}})

    } catch(error){
      console.log(error)

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }

      alert("Não foi possivel realizar a solicitação")

    } finally {
      setIsLoading(false)
    }
  }


  // async function fetchRefund( id: string ) {
  //   try{
  //       const { data } = await api.get<RefundAPIResponse>(`/refunds/${id}`)
        
  //       setName(data.name)
  //       setCategory(data.category)
  //       setAmount(formatCurrency(data.amount))
  //       setFileURL(data.filename)

  //   }catch (error) {
  //       console.log(error)
        
  //       if(error instanceof AxiosError) {
  //           return alert(error.response?.data.message)
  //       }

  //       alert("Não foi possivel Carregar")
  //   }
  // }



  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-300">
        <Header/>
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-sky-600 p-4">
            <h1 className="text-2xl font-bold text-white text-center">Solicitar Reembolso</h1>
          </div>
          
          <form onSubmit={onSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição do Gasto</label>
              <input 
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                  <option value="">Selecione...</option>
                  <option value="food">Alimentação</option>
                  <option value="transport">Transporte</option>
                  <option value="accommodation">Hospedagem</option>
                  <option value="services">Serviços</option>
                  <option value="others">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Valor (R$)</label>
                <input 
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              <label className="cursor-pointer block">
                <span className="text-sky-600 font-medium">Clique para enviar o comprovante</span>
                <input type="file" className="hidden" />
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button"
                onClick={handleClear}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-bold transition-colors shadow-lg cursor-pointer"
              >
                Enviar Solicitação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}